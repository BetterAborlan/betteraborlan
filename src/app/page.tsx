'use client';

import Link from 'next/link';
import { Card } from '@bettergov/kapwa/card';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import RealTimeData from '@/components/RealTimeData';
import NewsSection from '@/components/NewsSection';
import StatCard from '@/components/StatCard';
import { serviceCategories } from '@/data/serviceCategories';
import demographics from '@data/demographics.json';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="portal-hero">
        <div className="container portal-hero-grid portal-hero-grid--solo">
          <div className="portal-hero-text">
            <h1>{t('hero-welcome')}</h1>
            <p>{t('hero-subtitle')}</p>
            <div className="portal-hero-search">
              <SearchAutocomplete placeholder={t('hero-search-placeholder')} />
            </div>
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

      {/* Aborlan at a Glance */}
      <section className="portal-section portal-section--alt">
        <div className="container">
          <div className="glance-header">
            <h2>{t('home-glance-title')}</h2>
            <Link href="/statistics" className="glance-view-link">
              {t('home-glance-view-profile')} <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
          <div className="home-stats-v2-grid">
            <StatCard
              icon="bi-people-fill"
              value={demographics.population.toLocaleString()}
              label={t('stats-population-label')}
              source={`${demographics.population_year} census population`}
            />
            <StatCard
              icon="bi-geo-alt-fill"
              value={demographics.barangay_count.toString()}
              label={t('stats-barangays-label')}
              source={t('gov-branch-barangays-desc')}
            />
            <StatCard
              icon="bi-award-fill"
              value={demographics.income_classification}
              label={t('stats-income-label')}
              source={t('stats-source-psa-2020')}
            />
            <StatCard
              icon="bi-rulers"
              value={`${demographics.land_area_km2} km²`}
              label={t('stats-land-area-label')}
              source={t('stats-source-psa-2020')}
            />
          </div>
        </div>
      </section>

      {/* Real-Time Data */}
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('home-realtime-title')}</h2>
            <p>{t('weather-map-title')}</p>
          </div>
          <RealTimeData />
        </div>
      </section>

      <NewsSection />

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
