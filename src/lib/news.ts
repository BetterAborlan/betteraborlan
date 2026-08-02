export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const GOOGLE_NEWS_RSS_URL =
  'https://news.google.com/rss/search?q=Aborlan%20Palawan&hl=en-PH&gl=PH&ceid=PH:en';

function decodeXmlEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeXmlEntities(match[1]) : '';
}

// Google News has no official public API; its RSS feed is the standard way
// to pull curated results for a search query without an API key.
export async function fetchAborlanNews(limit = 10): Promise<NewsItem[]> {
  const res = await fetch(GOOGLE_NEWS_RSS_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`Google News RSS returned ${res.status}`);
  const xml = await res.text();

  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return blocks.slice(0, limit).map((block) => {
    const rawTitle = extractTag(block, 'title');
    const source = extractTag(block, 'source');
    // Google News titles are formatted "Headline - Source Name"; strip the
    // trailing source since it's already available structured via <source>.
    const suffix = ` - ${source}`;
    const title = source && rawTitle.endsWith(suffix) ? rawTitle.slice(0, -suffix.length) : rawTitle;
    return {
      title,
      link: extractTag(block, 'link'),
      pubDate: extractTag(block, 'pubDate'),
      source,
    };
  });
}

export function formatNewsDate(pubDate: string, locale: string): string {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}
