// Simple in-memory per-IP sliding-window rate limit. Resets on cold start,
// which is fine for a low-traffic civic site — this only needs to stop
// abusive bursts (against the free-tier Groq quota, or junk rows in the chat
// log), not act as a hardened limiter.
export function createRateLimiter(limit: number, windowMs: number) {
  const requestLog = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < windowMs);
    timestamps.push(now);
    requestLog.set(ip, timestamps);
    return timestamps.length > limit;
  };
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}
