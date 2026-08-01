'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCategories } from '@/data/serviceCategories';

const version = process.env.NEXT_PUBLIC_APP_VERSION ?? '';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="footer-v2">
      <div className="container">
        <div className="footer-v2-grid">
          <div>
            <div className="footer-v2-brand">
              <img
                src="/assets/images/logo/better-aborlan-logo-white.svg"
                alt=""
                width={38}
                height={41}
              />
              <span className="footer-v2-brand-text">
                <span className="footer-v2-brand-title">BetterAborlan</span>
                <span className="footer-v2-brand-tagline">A community-run portal for Aborlan</span>
              </span>
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
                <a
                  href="https://aborlanpalawan.gov.ph/wp-content/uploads/2025/04/Citizens-Charter-2025-1st-revision.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aborlan Citizen&apos;s Charter (PDF)
                </a>
              </li>
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
