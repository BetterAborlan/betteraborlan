'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

function isMobileNav(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const toggleDropdown = useCallback((index: number, e: React.MouseEvent) => {
    if (isMobileNav()) {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === index ? null : index));
    }
  }, []);

  useEffect(() => {
    // Header persists across route changes (it's in the root layout, not
    // remounted per-page), so closing the mobile menu on navigation has to
    // happen here rather than via a `key`-based reset.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMobileNav() && mobileMenuOpen) closeMenu();
      }, 150);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen, closeMenu]);

  return (
    <header className="site-header-v2">
      <div className="container header-inner-v2">
        <Link href="/" className="brand-v2">
          <img
            src="/assets/images/logo/better-aborlan-logo.svg"
            alt=""
            width={38}
            height={41}
          />
          <span className="brand-v2-text">
            <span className="brand-v2-title">BetterAborlan</span>
            <span className="brand-v2-tagline">A community-run portal for Aborlan</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          className={`main-nav-v2 ${mobileMenuOpen ? 'mobile-open' : ''}`}
          aria-label="Main Navigation"
        >
          <ul>
            <li>
              <Link href="/" className={pathname === '/' ? 'active' : ''}>
                {t('nav-home')}
              </Link>
            </li>
            <li className={openDropdown === 0 ? 'dropdown-open' : ''}>
              <Link
                href="/services"
                aria-haspopup="true"
                aria-expanded={openDropdown === 0 ? 'true' : 'false'}
                onClick={(e) => toggleDropdown(0, e)}
              >
                {t('nav-services')} <i className="bi bi-chevron-down chevron" aria-hidden="true"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/services/certificates">{t('dropdown-certificates')}</Link>
                </li>
                <li>
                  <Link href="/services/business">{t('dropdown-business')}</Link>
                </li>
                <li>
                  <Link href="/services/tax-payments">{t('dropdown-tax-payments')}</Link>
                </li>
                <li>
                  <Link href="/services/social-services">{t('dropdown-social-services')}</Link>
                </li>
                <li>
                  <Link href="/services/health">{t('dropdown-health')}</Link>
                </li>
                <li>
                  <Link href="/services/agriculture">{t('dropdown-agriculture')}</Link>
                </li>
                <li>
                  <Link href="/services/infrastructure">{t('dropdown-infrastructure')}</Link>
                </li>
                <li>
                  <Link href="/services/public-safety">{t('dropdown-public-safety')}</Link>
                </li>
                <li>
                  <Link href="/services/environment">{t('dropdown-environment')}</Link>
                </li>
                <li>
                  <Link href="/services/tourism">{t('dropdown-tourism')}</Link>
                </li>
                <li>
                  <Link href="/services/sports">{t('dropdown-sports')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/government">{t('nav-government')}</Link>
            </li>
            <li>
              <Link href="/statistics">{t('nav-statistics')}</Link>
            </li>
            <li>
              <Link href="/news">{t('nav-news')}</Link>
            </li>
            <li>
              <Link href="/contact">{t('nav-contact')}</Link>
            </li>
          </ul>
        </nav>

        <Link href="/search" className="header-search-btn">
          <i className="bi bi-search" aria-hidden="true"></i>
          <span>Search</span>
        </Link>

        <div className="lang-selector-v2">
          <button
            type="button"
            className={`lang-btn-v2 ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            type="button"
            className={`lang-btn-v2 ${language === 'fil' ? 'active' : ''}`}
            onClick={() => setLanguage('fil')}
            aria-label="Switch to Filipino"
          >
            FIL
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="header-mobile-toggle"
          onClick={() => {
            if (isAnimatingRef.current) return;
            setMobileMenuOpen((v) => !v);
          }}
          aria-label="Toggle Navigation"
          aria-expanded={mobileMenuOpen ? 'true' : 'false'}
        >
          <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
