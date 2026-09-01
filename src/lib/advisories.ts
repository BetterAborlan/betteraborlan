export type AdvisoryType = 'haze' | 'weather' | 'water' | 'road' | 'other';
export type AdvisorySeverity = 'advisory' | 'warning' | 'urgent' | 'resolved';

export interface Advisory {
  id: string;
  type: AdvisoryType;
  severity: AdvisorySeverity;
  title_en: string;
  title_fil: string;
  description_en: string;
  description_fil: string;
  source: string;
  source_url?: string;
  published_at: string;
  updated_at: string;
  active: boolean;
}

// Higher = shows as the primary/headline advisory when several are active.
const SEVERITY_RANK: Record<AdvisorySeverity, number> = {
  urgent: 3,
  warning: 2,
  advisory: 1,
  resolved: 0,
};

// Background/text pairs pulled from the brand palette (style.css --color-*).
// Accent and success are light enough that dark text — not white — is what
// actually clears AA contrast against them; info and danger need white.
export const SEVERITY_STYLES: Record<AdvisorySeverity, { bg: string; fg: string }> = {
  advisory: { bg: 'var(--color-info)', fg: 'var(--color-white)' },
  warning: { bg: 'var(--color-accent)', fg: 'var(--color-text)' },
  urgent: { bg: 'var(--color-danger)', fg: 'var(--color-white)' },
  resolved: { bg: 'var(--color-success)', fg: 'var(--color-text)' },
};

export function getActiveAdvisories(all: Advisory[]): Advisory[] {
  return all.filter((a) => a.active);
}

// Highest severity first; ties broken by most recently updated.
export function sortBySeverity(advisories: Advisory[]): Advisory[] {
  return [...advisories].sort((a, b) => {
    const rankDiff = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
    if (rankDiff !== 0) return rankDiff;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });
}

// Fingerprints the current active set (ids + updated_at) so a dismissal
// only sticks until the set changes — a new advisory publishes, or an
// existing one gets updated (e.g. marked resolved).
export function buildDismissFingerprint(advisories: Advisory[]): string {
  return advisories
    .map((a) => `${a.id}:${a.updated_at}`)
    .sort()
    .join('|');
}
