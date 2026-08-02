import { NextRequest, NextResponse } from 'next/server';
import { fetchAborlanNews } from '@/lib/news';

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get('limit');
  const parsed = limitParam ? parseInt(limitParam, 10) : 10;
  const limit = Math.min(Math.max(Number.isFinite(parsed) ? parsed : 10, 1), 20);

  try {
    const items = await fetchAborlanNews(limit);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [], error: 'Unable to fetch news right now.' }, { status: 502 });
  }
}
