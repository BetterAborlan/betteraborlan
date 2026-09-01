'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  buildDismissFingerprint,
  getActiveAdvisories,
  sortBySeverity,
  SEVERITY_STYLES,
  type Advisory,
  type AdvisorySeverity,
  type AdvisoryType,
} from '@/lib/advisories';
import advisoriesData from '@data/advisories.json';

const STORAGE_KEY = 'ba-advisory-dismissed-v1';

const SEVERITY_ICON: Record<AdvisorySeverity, string> = {
  advisory: 'bi-info-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
  urgent: 'bi-exclamation-octagon-fill',
  resolved: 'bi-check-circle-fill',
};

const TYPE_ICON: Record<AdvisoryType, string> = {
  haze: 'bi-cloud-haze2-fill',
  weather: 'bi-cloud-lightning-rain-fill',
  water: 'bi-droplet-fill',
  road: 'bi-cone-striped',
  other: 'bi-megaphone-fill',
};

function AdvisoryDetail({ advisory }: { advisory: Advisory }) {
  const { language, t } = useLanguage();
  const description = language === 'fil' ? advisory.description_fil : advisory.description_en;
  const updated = new Date(advisory.updated_at);
  const updatedStr = Number.isNaN(updated.getTime())
    ? advisory.updated_at
    : updated.toLocaleString(language === 'fil' ? 'fil-PH' : 'en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

  return (
    <div className="advisory-banner-detail">
      {description.split('\n\n').map((para, i) => (
        <p key={i} className="advisory-banner-detail-para">
          {para.split('\n').map((line, j, arr) => (
            <span key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
      <p className="advisory-banner-detail-meta">
        <span>
          {t('advisory-banner-source-label')}{' '}
          {advisory.source_url ? (
            <a href={advisory.source_url} target="_blank" rel="noopener noreferrer">
              {advisory.source}
            </a>
          ) : (
            advisory.source
          )}
        </span>
        <span aria-hidden="true"> · </span>
        <span>
          {t('advisory-banner-updated-label')} {updatedStr}
        </span>
      </p>
    </div>
  );
}

export default function AdvisoryBanner() {
  const { language, t } = useLanguage();
  const [dismissed, setDismissed] = useState(true); // default hidden until checked, avoids flash
  const [expanded, setExpanded] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  const active = useMemo(
    () => sortBySeverity(getActiveAdvisories(advisoriesData as Advisory[])),
    []
  );
  const fingerprint = useMemo(() => buildDismissFingerprint(active), [active]);

  useEffect(() => {
    if (active.length === 0) return;
    // Read localStorage post-mount, same as LanguageContext — SSR has no
    // access to it, so this can only resolve one tick after first render.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(stored === fingerprint);
    } catch {
      setDismissed(false);
    }
  }, [active.length, fingerprint]);

  if (active.length === 0 || dismissed) return null;

  const primary = active[0];
  const others = active.slice(1);
  const style = SEVERITY_STYLES[primary.severity];
  const title = language === 'fil' ? primary.title_fil : primary.title_en;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, fingerprint);
    } catch {
      // ignore — worst case the banner just reappears next visit
    }
    setDismissed(true);
  };

  const alertRole = primary.severity === 'urgent' ? 'alert' : 'status';

  return (
    <div
      className="advisory-banner"
      style={{ background: style.bg, color: style.fg }}
      role="region"
      aria-label="Site alerts"
    >
      <div className="container advisory-banner-inner" role={alertRole}>
        <i className={`bi ${TYPE_ICON[primary.type]} advisory-banner-icon`} aria-hidden="true" />
        <div className="advisory-banner-body">
          <div className="advisory-banner-headline">
            <span className="advisory-banner-severity-tag">
              <i className={`bi ${SEVERITY_ICON[primary.severity]}`} aria-hidden="true" />{' '}
              {t(`advisory-banner-severity-${primary.severity}`)}
            </span>
            <span className="advisory-banner-title">{title}</span>
          </div>

          <button
            type="button"
            className="advisory-banner-toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? t('advisory-banner-show-less') : t('advisory-banner-learn-more')}
            <i className={`bi bi-chevron-${expanded ? 'up' : 'down'}`} aria-hidden="true" />
          </button>

          {others.length > 0 && (
            <button
              type="button"
              className="advisory-banner-toggle advisory-banner-more-toggle"
              aria-expanded={showOthers}
              onClick={() => setShowOthers((v) => !v)}
            >
              {others.length === 1
                ? t('advisory-banner-more-one')
                : t('advisory-banner-more-other').replace('{n}', String(others.length))}
              <i className={`bi bi-chevron-${showOthers ? 'up' : 'down'}`} aria-hidden="true" />
            </button>
          )}

          {expanded && <AdvisoryDetail advisory={primary} />}

          {showOthers && others.length > 0 && (
            <ul className="advisory-banner-others">
              {others.map((a) => (
                <li key={a.id} className="advisory-banner-other-item">
                  <span
                    className="advisory-banner-other-dot"
                    style={{ background: SEVERITY_STYLES[a.severity].bg }}
                    aria-hidden="true"
                  />
                  <span className="advisory-banner-other-title">
                    {language === 'fil' ? a.title_fil : a.title_en}
                  </span>
                  <span className="advisory-banner-other-source">
                    {t('advisory-banner-source-label')} {a.source}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="advisory-banner-dismiss"
          aria-label={t('advisory-banner-dismiss')}
          onClick={dismiss}
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
