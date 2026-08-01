'use client';

import Link from 'next/link';
import { Card } from '@bettergov/kapwa/card';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import RealTimeData from '@/components/RealTimeData';
import { serviceCategories } from '@/data/serviceCategories';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="portal-hero">
        <div className="container portal-hero-grid">
          <div className="portal-hero-text">
            <h1>{t('hero-welcome')}</h1>
            <p>{t('hero-subtitle')}</p>
            <form className="portal-hero-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <SearchAutocomplete placeholder={t('hero-search-placeholder')} />
            </form>
            <div className="portal-hero-tags">
              <span>{t('hero-popular')}</span>
              <Link href="/service-details/birth-certificate">{t('hero-birth-certificate')}</Link>
              <Link href="/service-details/business-permit-new">{t('hero-business-permit')}</Link>
              <Link href="/service-details/real-property-tax">{t('hero-real-property-tax')}</Link>
            </div>
          </div>

          <div className="popular-panel">
            <h2>{t('section-popular')}</h2>
            <div className="popular-panel-grid">
              <Link href="/services/certificates" className="popular-panel-card">
                <span className="popular-panel-icon">
                  <i className="bi bi-file-earmark-text-fill" aria-hidden="true"></i>
                </span>
                <span>{t('service-certificates')}</span>
              </Link>
              <Link href="/services/business" className="popular-panel-card">
                <span className="popular-panel-icon">
                  <i className="bi bi-shop" aria-hidden="true"></i>
                </span>
                <span>{t('service-business')}</span>
              </Link>
              <Link href="/services/agriculture" className="popular-panel-card">
                <span className="popular-panel-icon">
                  <i className="bi bi-flower1" aria-hidden="true"></i>
                </span>
                <span>{t('dropdown-agriculture')}</span>
              </Link>
              <Link href="/services/health" className="popular-panel-card">
                <span className="popular-panel-icon">
                  <i className="bi bi-heart-pulse-fill" aria-hidden="true"></i>
                </span>
                <span>{t('service-health')}</span>
              </Link>
            </div>
            <Link href="/services" className="popular-panel-btn">
              {t('btn-view-all-services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Government Services */}
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('home-gov-services-title')}</h2>
            <p>{t('home-gov-services-subtitle')}</p>
          </div>
          <div className="service-cat-grid">
            {serviceCategories.map((cat) => {
              const catTitle = t(`dropdown-${cat.id}`);
              return (
                <Card key={cat.id} hoverable className="service-cat-card">
                  <span className="service-cat-icon">
                    <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
                  </span>
                  <h3>{catTitle}</h3>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href={cat.href}>
                    {t('services-view-all')} {catTitle}{' '}
                    <i className="bi bi-arrow-right" aria-hidden="true"></i>
                  </Link>
                </Card>
              );
            })}
          </div>
          <div className="portal-section-cta">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 h-10 text-base font-medium text-[var(--color-kapwa-text-inverse)] shadow-xs transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
            >
              {t('btn-view-all-services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Real-Time Data */}
      <section className="portal-section portal-section--alt">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('home-realtime-title')}</h2>
            <p>{t('weather-map-title')}</p>
          </div>
          <RealTimeData />
        </div>
      </section>

      {/* Government of Aborlan */}
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('gov-page-title')}</h2>
            <p>{t('gov-page-subtitle')}</p>
          </div>
          <div className="gov-branch-grid">
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-star-fill" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-executive')}</h3>
              <p>{t('gov-branch-executive-desc')}</p>
            </Card>
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-bank2" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-legislative')}</h3>
              <p>{t('gov-branch-legislative-desc')}</p>
            </Card>
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-signpost-split-fill" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-barangays')}</h3>
              <p>
                {t('stats-barangays-source')} — {t('gov-branch-barangays-desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Directory banner */}
      <div className="directory-banner">
        <div className="container directory-banner-inner">
          <div>
            <h2>{t('home-directory-title')}</h2>
            <p>{t('home-directory-subtitle')}</p>
          </div>
          <Link href="/government" className="directory-banner-btn">
            {t('home-directory-btn')}
          </Link>
        </div>
      </div>
    </>
  );
}
