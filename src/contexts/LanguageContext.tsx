'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-services': 'Services',
    'nav-government': 'Government',
    'nav-statistics': 'Statistics',
    'nav-legislative': 'Legislative',
    'nav-transparency': 'Transparency',
    'nav-contact': 'Contact',

    // Header dropdown - Services
    'dropdown-certificates': 'Certificates',
    'dropdown-business': 'Business',
    'dropdown-tax-payments': 'Tax Payments',
    'dropdown-social-services': 'Social Services',
    'dropdown-health': 'Health',
    'dropdown-agriculture': 'Agriculture',
    'dropdown-infrastructure': 'Infrastructure',
    'dropdown-education': 'Education',
    'dropdown-public-safety': 'Public Safety',
    'dropdown-environment': 'Environment',

    // Header dropdown - Legislative
    'dropdown-ordinance-framework': 'Ordinance Framework',
    'dropdown-resolution-framework': 'Resolution Framework',

    // Hero
    'hero-welcome': 'Welcome to BetterAborlan.org',
    'hero-subtitle':
      'Access government services, information, and resources for the people of Aborlan, Palawan.',
    'hero-find-service': 'Find a Service',
    'hero-browse-services': 'Browse Services',
    'hero-contact-us': 'Contact Us',
    'hero-search-placeholder': 'e.g., birth certificate, business permit',
    'hero-popular': 'Popular:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Business Permit',
    'hero-real-property-tax': 'Real Property Tax',

    // Popular services
    'section-popular': 'Popular Services',
    'popular-services-subtitle': 'Quick access to frequently requested municipal services',
    'popular-browse-directory': 'Browse complete directory',
    'service-certificates': 'Certificates',
    'service-certificates-desc': 'Birth, marriage, death certificates',
    'service-business': 'Business Permits',
    'service-business-desc': 'New permits and renewals',
    'service-tax': 'Tax Payments',
    'service-tax-desc': 'Property and business taxes',
    'service-social': 'Social Services',
    'service-social-desc': 'Senior citizen & PWD services',
    'service-health': 'Health Services',
    'service-health-desc': 'Medical assistance & programs',
    'btn-view-all-services': 'View All Services',

    // Stats
    'stats-at-a-glance': 'Aborlan at a Glance',
    'stats-view-statistics': 'View Statistics',
    'stats-population-label': 'Population',
    'stats-population-source': 'Pending verification',
    'stats-barangays-label': 'Barangays',
    'stats-barangays-source': 'Administrative Units',
    'stats-municipality-label': '1st Class Municipality',
    'stats-municipality-source': 'Income Classification (pending verification)',
    'stats-land-area-label': 'Land Area',
    'stats-land-area-source': 'Pending verification',

    // Weather & map
    'weather-map-title': 'Weather and Map of Aborlan',
    'weather-mainly-clear': 'Mainly clear',
    'weather-location': 'Aborlan, Palawan',

    // Updates
    'section-updates': 'Latest Updates',
    'btn-view-all': 'View All',

    // Leadership
    'section-leadership': 'Municipal Leadership',
    'title-mayor': 'Municipal Mayor',
    'title-vice-mayor': 'Municipal Vice Mayor',
    'btn-view-officials': 'View All Officials',

    // Contact
    'section-contact': 'Contact Information',
    'contact-phone': 'Phone',
    'contact-email': 'Email',
    'contact-address': 'Address',
    'contact-hours': 'Mon-Fri: 8:00 AM - 5:00 PM',
    'contact-response': "We'll respond within 24 hours",
    'contact-municipal-hall': 'Municipal Hall',

    // Footer
    'footer-tagline':
      'Empowering the people of Aborlan with transparent access to the services, programs, and public funds of LGU Aborlan.',
    'footer-quick-links': 'Quick Links',
    'footer-resources': 'Resources',
    'footer-sitemap': 'Sitemap',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Terms of Use',
    'footer-privacy': 'Privacy Policy',
    'footer-accessibility': 'Accessibility',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Freedom of Information',
    'footer-lgu-portal': 'Official LGU Aborlan Portal',
    'footer-sb': 'Sangguniang Bayan',
    'footer-lgu-facebook': 'LGU Aborlan Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Cost to the People of Aborlan =',
    'footer-volunteer': 'Volunteer with us',
    'footer-contribute': 'Contribute code with us',
    'footer-copyright-text': 'BetterAborlan.org',
    'footer-copyright-disclaimer': 'All public information sourced from official government portals.',
    'footer-skip-to-main': 'Skip to main content',
  },
  fil: {
    'nav-home': 'Tahanan',
    'nav-services': 'Mga Serbisyo',
    'nav-government': 'Pamahalaan',
    'nav-statistics': 'Estadistika',
    'nav-legislative': 'Lehislatura',
    'nav-transparency': 'Transparensiya',
    'nav-contact': 'Makipag-ugnayan',

    'dropdown-certificates': 'Mga Sertipiko',
    'dropdown-business': 'Negosyo',
    'dropdown-tax-payments': 'Pagbabayad ng Buwis',
    'dropdown-social-services': 'Serbisyong Panlipunan',
    'dropdown-health': 'Kalusugan',
    'dropdown-agriculture': 'Agrikultura',
    'dropdown-infrastructure': 'Imprastraktura',
    'dropdown-education': 'Edukasyon',
    'dropdown-public-safety': 'Kaligtasang Pampubliko',
    'dropdown-environment': 'Kapaligiran',

    'dropdown-ordinance-framework': 'Balangkas ng Ordinansa',
    'dropdown-resolution-framework': 'Balangkas ng Resolusyon',

    'hero-welcome': 'Maligayang Pagdating sa BetterAborlan.org',
    'hero-subtitle':
      'I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Aborlan, Palawan.',
    'hero-find-service': 'Maghanap ng Serbisyo',
    'hero-browse-services': 'Tingnan ang mga Serbisyo',
    'hero-contact-us': 'Makipag-ugnayan',
    'hero-search-placeholder': 'hal., birth certificate, business permit',
    'hero-popular': 'Sikat:',
    'hero-birth-certificate': 'Birth Certificate',
    'hero-business-permit': 'Permit sa Negosyo',
    'hero-real-property-tax': 'Buwis sa Ari-arian',

    'section-popular': 'Mga Sikat na Serbisyo',
    'popular-services-subtitle': 'Mabilis na access sa mga madalas hinihinging serbisyo',
    'popular-browse-directory': 'Tingnan ang kumpletong direktoryo',
    'service-certificates': 'Mga Sertipiko',
    'service-certificates-desc': 'Sertipiko ng kapanganakan, kasal, at kamatayan',
    'service-business': 'Mga Permit sa Negosyo',
    'service-business-desc': 'Bagong permit at pag-renew',
    'service-tax': 'Pagbabayad ng Buwis',
    'service-tax-desc': 'Buwis sa ari-arian at negosyo',
    'service-social': 'Serbisyong Panlipunan',
    'service-social-desc': 'Serbisyo para sa senior citizen at PWD',
    'service-health': 'Serbisyong Pangkalusugan',
    'service-health-desc': 'Tulong medikal at mga programa',
    'btn-view-all-services': 'Tingnan Lahat ng Serbisyo',

    'stats-at-a-glance': 'Isang Tingin sa Aborlan',
    'stats-view-statistics': 'Tingnan ang Estadistika',
    'stats-population-label': 'Populasyon',
    'stats-population-source': 'Hinihintay ang beripikasyon',
    'stats-barangays-label': 'Mga Barangay',
    'stats-barangays-source': 'Mga Yunit Administratibo',
    'stats-municipality-label': '1st Class na Munisipalidad',
    'stats-municipality-source': 'Klasipikasyon ng Kita (hinihintay ang beripikasyon)',
    'stats-land-area-label': 'Lawak ng Lupa',
    'stats-land-area-source': 'Hinihintay ang beripikasyon',

    'weather-map-title': 'Panahon at Mapa ng Aborlan',
    'weather-mainly-clear': 'Halos maaliwalas',
    'weather-location': 'Aborlan, Palawan',

    'section-updates': 'Pinakabagong mga Update',
    'btn-view-all': 'Tingnan Lahat',

    'section-leadership': 'Pamunuan ng Munisipyo',
    'title-mayor': 'Punong Bayan',
    'title-vice-mayor': 'Bise Punong Bayan',
    'btn-view-officials': 'Tingnan Lahat ng Opisyal',

    'section-contact': 'Impormasyon sa Pakikipag-ugnayan',
    'contact-phone': 'Telepono',
    'contact-email': 'Email',
    'contact-address': 'Adres',
    'contact-hours': 'Lunes-Biyernes: 8:00 AM - 5:00 PM',
    'contact-response': 'Sasagutin namin sa loob ng 24 na oras',
    'contact-municipal-hall': 'Bulwagan ng Bayan',

    'footer-tagline':
      'Pagbibigay-kapangyarihan sa mga tao ng Aborlan na may transparent na access sa mga serbisyo, programa, at pampublikong pondo ng LGU Aborlan.',
    'footer-quick-links': 'Mga Mabilisang Link',
    'footer-resources': 'Mga Mapagkukunan',
    'footer-sitemap': 'Mapa ng Site',
    'footer-citizens-charter': "Citizen's Charter",
    'footer-terms': 'Mga Tuntunin ng Paggamit',
    'footer-privacy': 'Patakaran sa Privacy',
    'footer-accessibility': 'Aksesibilidad',
    'footer-faq': 'FAQ',
    'footer-open-data': 'Open Data Philippines',
    'footer-foi': 'Kalayaan sa Impormasyon',
    'footer-lgu-portal': 'Opisyal na Portal ng LGU Aborlan',
    'footer-sb': 'Sangguniang Bayan',
    'footer-lgu-facebook': 'LGU Aborlan Facebook',
    'footer-blgf': 'BLGF Portal',
    'footer-cmci': 'CMCI DTI Portal',
    'footer-cost': 'Gastos sa mga Tao ng Aborlan =',
    'footer-volunteer': 'Mag-volunteer sa amin',
    'footer-contribute': 'Mag-ambag ng code sa amin',
    'footer-copyright-text': 'BetterAborlan.org',
    'footer-copyright-disclaimer': 'Lahat ng pampublikong impormasyon ay mula sa mga opisyal na portal ng pamahalaan.',
    'footer-skip-to-main': 'Lumaktaw sa pangunahing nilalaman',
  },
};

type Language = 'en' | 'fil';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Read localStorage post-mount rather than in a lazy initializer so SSR
    // output ('en') always matches the client's first render, avoiding a
    // hydration mismatch — the saved language applies one tick later.
    const savedLang = localStorage.getItem('betteraborlan_lang') as Language;
    if (savedLang && ['en', 'fil'].includes(savedLang)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('betteraborlan_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
