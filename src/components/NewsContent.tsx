'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatNewsDate, type NewsItem } from '@/lib/news';

export default function NewsContent() {
  const { t, language } = useLanguage();
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/news?limit=15')
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setError(true));
  }, []);

  const locale = language === 'fil' ? 'fil-PH' : 'en-PH';

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('news-page-title')}</h2>
          <p>{t('news-page-subtitle')}</p>
        </div>

        {error ? (
          <p className="pending">{t('news-error')}</p>
        ) : items && items.length === 0 ? (
          <p className="pending">{t('news-empty')}</p>
        ) : (
          <div className="news-grid news-grid--page">
            {(items ?? Array.from({ length: 6 })).map((item, i) =>
              item ? (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card surface-card--hoverable news-card"
                >
                  <span className="news-card-source">{item.source || t('news-source-fallback')}</span>
                  <h3 className="news-card-title">{item.title}</h3>
                  <span className="news-card-date">{formatNewsDate(item.pubDate, locale)}</span>
                </a>
              ) : (
                <div key={i} className="surface-card news-card news-card--loading">
                  <span className="pending">{t('news-loading')}</span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
