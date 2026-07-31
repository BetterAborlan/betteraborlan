'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCategories } from '@/data/serviceCategories';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const [version, setVersion] = useState('');

  useEffect(() => {
    fetch('/version.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.version) setVersion(data.version);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer-v2">
      <div className="container">
        <div className="footer-v2-grid">
          <div>
            <div className="footer-v2-brand">
              <img
                src="/assets/images/logo/better-aborlan-logo-white.svg"
                alt="BetterAborlan.org"
                width={110}
                height={44}
              />
            </div>
            <p className="footer-v2-tagline">{t('footer-tagline')}</p>
            <div className="footer-social-new">
              <a
                href="https://facebook.com/betteraborlan.org"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://github.com/BetterAborlan/betteraborlan"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://discord.gg/Fsgdh7cJvw"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <i className="bi bi-discord"></i>
              </a>
              <a
                href="https://linkedin.com/company/betteraborlan"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
            <a
              href="https://github.com/BetterAborlan/betteraborlan/releases"
              className="footer-changelog-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-clock-history" aria-hidden="true"></i> Changelog
            </a>
          </div>

          <div>
            <h4>{t('footer-quick-links')}</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/sitemap-page">{t('footer-sitemap')}</Link>
              </li>
              <li>
                <Link href="/terms">{t('footer-terms')}</Link>
              </li>
              <li>
                <Link href="/privacy">{t('footer-privacy')}</Link>
              </li>
              <li>
                <Link href="/accessibility">{t('footer-accessibility')}</Link>
              </li>
              <li>
                <Link href="/faq">{t('footer-faq')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('nav-services')}</h4>
            <ul>
              {serviceCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={cat.href}>{cat.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/services">All Services</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('footer-resources')}</h4>
            <ul>
              <li>
                <a href="https://data.gov.ph" target="_blank" rel="noopener noreferrer">
                  {t('footer-open-data')}
                </a>
              </li>
              <li>
                <a href="https://www.foi.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-foi')}
                </a>
              </li>
              <li>
                <a href="https://blgf.gov.ph/" target="_blank" rel="noopener noreferrer">
                  {t('footer-blgf')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-v2-bottom">
          <span>
            &copy; {currentYear} {t('footer-copyright-text')} · MIT | CC BY 4.0
          </span>
          <span>{t('footer-copyright-disclaimer')}</span>
          <span>{version ? `Ver. ${version}` : ''}</span>
        </div>
      </div>
    </footer>
  );
}
