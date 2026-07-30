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
              <Link href="/service-details/business-permits-licensing">
                {t('hero-business-permit')}
              </Link>
              <Link href="/service-details/municipal-treasurer">{t('hero-real-property-tax')}</Link>
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
              <Link href="/services/education" className="popular-panel-card">
                <span className="popular-panel-icon">
                  <i className="bi bi-mortarboard-fill" aria-hidden="true"></i>
                </span>
                <span>Education</span>
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
            <h2>Government Services</h2>
            <p>Access official municipal services quickly and easily.</p>
          </div>
          <div className="service-cat-grid">
            {serviceCategories.map((cat) => (
              <Card key={cat.id} hoverable className="service-cat-card">
                <span className="service-cat-icon">
                  <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={cat.href}>
                  View All {cat.title} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </Card>
            ))}
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
            <h2>Real-Time Data Services</h2>
            <p>{t('weather-map-title')}</p>
          </div>
          <RealTimeData />
        </div>
      </section>

      {/* PhilSys external CTA */}
      <div className="cta-banner-accent">
        <div className="container cta-banner-accent-inner">
          <div>
            <h2>PhilSys National ID Registration</h2>
            <p>
              Register for your Philippine Identification System (PhilSys) ID — the national
              government&apos;s single identification document for all citizens, available to
              residents of Aborlan through the official PhilSys portal.
            </p>
          </div>
          <a
            href="https://www.philsys.gov.ph/"
            className="cta-banner-accent-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Government of Aborlan */}
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>Government of Aborlan</h2>
            <p>How the municipal government of Aborlan is organized.</p>
          </div>
          <div className="gov-branch-grid">
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-star-fill" aria-hidden="true"></i>
              </span>
              <h3>Executive</h3>
              <p>Office of the Municipal Mayor and Vice Mayor, and their line departments.</p>
            </Card>
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-bank2" aria-hidden="true"></i>
              </span>
              <h3>Legislative</h3>
              <p>Sangguniang Bayan ng Aborlan — the municipal council that enacts ordinances.</p>
            </Card>
            <Card className="gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-signpost-split-fill" aria-hidden="true"></i>
              </span>
              <h3>Barangays</h3>
              <p>{t('stats-barangays-source')} — the local administrative units of Aborlan.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Directory banner */}
      <div className="directory-banner">
        <div className="container directory-banner-inner">
          <div>
            <h2>Official Directory</h2>
            <p>Find contact information for Aborlan officials, offices, and barangays.</p>
          </div>
          <Link href="/government" className="directory-banner-btn">
            View Directory
          </Link>
        </div>
      </div>
    </>
  );
}
