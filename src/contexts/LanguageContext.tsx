'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-services': 'Services',
    'nav-government': 'Government',
    'nav-statistics': 'Statistics',
    'nav-news': 'News',
    'nav-contact': 'Contact',

    // Header dropdown - Services
    'dropdown-certificates': 'Certificates',
    'dropdown-business': 'Business',
    'dropdown-tax-payments': 'Tax Payments',
    'dropdown-social-services': 'Social Services',
    'dropdown-health': 'Health',
    'dropdown-agriculture': 'Agriculture',
    'dropdown-infrastructure': 'Infrastructure',
    'dropdown-public-safety': 'Public Safety',
    'dropdown-environment': 'Environment',
    'dropdown-tourism': 'Tourism',
    'dropdown-sports': 'Sports',

    // Hero
    'hero-welcome': 'Welcome to BetterAborlan.org',
    'hero-subtitle':
      'Access government services, information, and resources for the people of Aborlan, Palawan.',
    'hero-find-service': 'Find a Service',
    'hero-browse-services': 'Browse Services',
    'hero-contact-us': 'Contact Us',
    'hero-search-placeholder': 'e.g., birth certificate, business permit',
    'hero-popular': 'Popular:',
    'hero-birth-certificate': 'Birth Registration',
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
    'forecast-5day-title': '5-Day Forecast',
    'forecast-today': 'Today',
    'home-glance-title': 'Aborlan at a Glance',
    'home-glance-view-profile': 'View Municipality Profile',

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

    // Shared
    'gov-pending-verification': 'Pending verification',
    'home-gov-services-title': 'Government Services',
    'home-gov-services-subtitle': 'Access official municipal services quickly and easily.',
    'home-realtime-title': 'Real-Time Data Services',
    'home-directory-title': 'Official Directory',
    'home-directory-subtitle': 'Find contact information for Aborlan officials, offices, and barangays.',
    'home-directory-btn': 'View Directory',

    // Contact page
    'contact-page-title': 'Contact',
    'contact-page-subtitle': 'Reach the Municipality of Aborlan or its emergency response offices.',
    'contact-office-hours-pending':
      'Office hours and direct trunkline pending verification from the municipal hall.',
    'contact-hotlines-heading': 'Emergency Hotlines',
    'contact-hotline-tbd': 'TBD',

    // Government page
    'gov-page-title': 'Government of Aborlan',
    'gov-page-subtitle': 'How the municipal government of Aborlan is organized.',
    'gov-branch-executive': 'Executive',
    'gov-branch-executive-desc': 'Office of the Municipal Mayor and Vice Mayor, and their line departments.',
    'gov-branch-legislative': 'Legislative',
    'gov-branch-legislative-desc':
      'Sangguniang Bayan ng Aborlan — the municipal council that enacts ordinances.',
    'gov-branch-barangays': 'Barangays',
    'gov-branch-barangays-desc': 'the local administrative units of Aborlan.',
    'gov-barangays-word': 'barangays',
    'gov-elected-officials': 'Elected Officials',
    'gov-elected-officials-subtitle':
      'The mayor, vice mayor, and other leaders representing Aborlan for the 2025–2028 term.',
    'gov-councilors-pending': 'Sangguniang Bayan member roster pending verification.',
    'gov-sb-members': 'Sangguniang Bayan Members',
    'gov-officials-footnote':
      'Officials assumed office June 30, 2025. Mayor and Vice Mayor are confirmed from news reports; councilor names are from initial election results and may change once officially proclaimed.',
    'gov-barangays-page-subtitle':
      'Aborlan is made up of 19 barangays, each with its own 2024 census population.',
    'gov-barangays-directory-pending':
      "Barangay directory pending verification from the official Aborlan LGU or the PSGC (Philippine Standard Geographic Code) list.",
    'gov-residents-word': 'residents',
    'title-representative': 'Representative, 3rd District of Palawan',
    'title-sk-president': 'SK Federation President',
    'title-ipmr': 'IPMR (Indigenous Peoples Mandatory Representative)',

    // Statistics page
    'stats-page-title': 'Aborlan at a Glance',
    'stats-page-subtitle':
      'Population is from the 2024 national census; land area and income class from 2020.',
    'stats-households-label': 'Households',
    'stats-source-psa-2024': 'PSA 2024 Census',
    'stats-income-label': 'Income Classification',
    'stats-source-psa-2020': 'PSA 2024 Census',
    'stats-registered-voters-label': 'Registered Voters',
    'stats-source-comelec-2025': 'COMELEC, 2025 elections',
    'stats-province-label': 'Province',
    'stats-region-label': 'Region',
    'stats-population-by-barangay': 'Population by Barangay',
    'stats-as-of-date': 'as of 31 July 2025',
    'stats-barangay-table-subtitle':
      'PSA 2024 Census of Population (POPCEN) — sums exactly to the municipal total above.',
    'stats-th-barangay': 'Barangay',
    'stats-th-urban-rural': 'Urban / Rural',
    'stats-th-population': '2024 Population',
    'stats-th-share': 'Share of Total',
    'stats-urban': 'Urban',
    'stats-rural': 'Rural',

    // Services pages
    'services-page-title': 'Services Directory',
    'services-page-subtitle':
      'Browse all municipal services offered by LGU Aborlan, organized by category.',
    'services-view-all': 'View All',
    'services-empty-title': 'Nothing to list here yet',
    'services-empty-desc-1': "The Aborlan Citizen's Charter doesn't list a formal frontline service for",
    'services-empty-desc-2':
      "— that doesn't mean the LGU has nothing to offer, just that it isn't a standardized process we could confirm and cite. If you know of one,",
    'services-empty-cta': 'let us know',
    'services-empty-desc-3': 'so it can be added with a real source.',
    'services-fee': 'Fee',
    'services-processing-time': 'Processing time',
    'services-office': 'Office',
    'services-view-details': 'View Details',
    'services-back-to-directory': 'Back to Services Directory',

    // Service detail page
    'service-details-heading': 'What you need to know',
    'service-details-responsible-office': 'Responsible office',
    'service-details-unsourced-1':
      "Fee, processing time, and office details haven't been sourced from the official Aborlan LGU or its Citizen's Charter yet — check",
    'service-details-unsourced-2': 'for how to reach the municipal hall directly in the meantime.',
    'service-details-back-to': 'Back to',

    // Search page
    'search-page-title': 'Search',
    'search-page-subtitle': 'Find a government service by name.',
    'search-label': 'Search services',
    'search-placeholder': 'e.g. business permit, barangay clearance...',
    'search-no-results': 'No services match',

    // News section & page
    'news-section-title': 'Latest News',
    'news-section-subtitle': 'Recent headlines about Aborlan, via Google News.',
    'news-view-all': 'View all news',
    'news-page-title': 'News',
    'news-page-subtitle': 'Recent headlines about Aborlan, Palawan, gathered from Google News.',
    'news-loading': 'Loading headlines…',
    'news-error': "Couldn't load news right now. Please try again later.",
    'news-empty': 'No recent news found.',
    'news-source-fallback': 'Google News',

    // Sitemap page
    'sitemap-about': 'About',
    'sitemap-search': 'Search',
    'sitemap-page-subtitle': 'Every page on BetterAborlan.org, in one place.',
    'sitemap-main-pages': 'Main Pages',
    'sitemap-service-categories': 'Service Categories',
    'sitemap-legal-support': 'Legal & Support',

    // About page
    'about-page-title': 'About BetterAborlan.org',
    'about-page-subtitle':
      'An independent, volunteer-built civic transparency portal for the Municipality of Aborlan, Palawan — a directory of local government services, officials, and public statistics in one place.',
    'about-why-heading': 'Why this exists',
    'about-why-body':
      "Residents shouldn't have to dig through scattered Facebook posts or outdated flyers to find which office handles a permit, who their elected officials are, or what services are available. BetterAborlan.org centralizes that information and keeps it easy to find.",
    'about-bettergov-heading': 'Based on BetterGov.ph',
    'about-bettergov-body-1': "This site's layout, design system (",
    'about-bettergov-body-2': '), and data conventions are based on',
    'about-bettergov-body-3':
      'part of the wider community effort to make Philippine government information more accessible.',
    'about-data-policy-heading': 'Data policy',
    'about-data-policy-body-1':
      'We do not fabricate or guess civic data. Where official figures are not yet available or verified, the site shows an explicit',
    'about-data-policy-body-2': 'state instead of a placeholder number. See the project’s',
    'about-data-policy-body-3': 'for source data and contribution details.',
    'about-github-repo': 'GitHub repository',

    // FAQ page
    'faq-page-title': 'Frequently Asked Questions',
    'faq-q1': 'Is this an official government website?',
    'faq-a1':
      'No. BetterAborlan.org is an independent, volunteer-built civic transparency portal, not an official website of the Municipality of Aborlan or any government agency.',
    'faq-q2': 'Where does the information on this site come from?',
    'faq-a2':
      'From publicly available official sources — the Sangguniang Bayan, COMELEC, PSA, and the Aborlan LGU’s own published materials. Where a figure isn’t yet sourced or verified, the page says so explicitly instead of showing a guess.',
    'faq-q3': 'I found an error or outdated information. What do I do?',
    'faq-a3': 'Please report it via our GitHub repository issues or Discord server so it can be corrected.',
    'faq-q4': 'Can I contribute?',
    'faq-a4': 'Yes. The project is open source. See the GitHub repository for how to contribute code or data.',
    'faq-q5': 'Does this site replace official municipal channels?',
    'faq-a5':
      'No. For binding transactions (permits, certificates, payments), always confirm directly with the relevant municipal office.',

    // Terms page
    'terms-independent-heading': 'Independent, volunteer-run project',
    'terms-independent-body':
      'BetterAborlan.org is an independent, volunteer-built civic transparency portal. It is not an official website of the Municipality of Aborlan or any Philippine government agency, and is not affiliated with or endorsed by them.',
    'terms-no-warranty-heading': 'No warranty',
    'terms-no-warranty-body':
      'Content is provided "as is" for general informational purposes. While we try to keep information accurate and clearly mark unverified data, we make no guarantee of completeness or accuracy. For official transactions, always confirm details directly with the relevant municipal office.',
    'terms-open-source-heading': 'Open source',
    'terms-open-source-body-1':
      'The code powering this site is open source (MIT License) and the underlying data is licensed CC BY 4.0. See the',
    'terms-open-source-body-2': 'for details.',

    // Privacy page
    'privacy-collect-heading': 'What we collect',
    'privacy-collect-body':
      'BetterAborlan.org does not require an account and does not ask visitors for personal information to browse the site. We do not sell or share visitor data with third parties.',
    'privacy-third-party-heading': 'Third-party data on this site',
    'privacy-third-party-body':
      "Some widgets (weather, currency exchange rates, map tiles) call public third-party APIs directly from your browser to display live data. No personal information is sent to them beyond what any standard web request includes (e.g., your IP address, handled by those providers under their own policies).",
    'privacy-hosting-heading': 'Hosting',
    'privacy-hosting-body':
      'This site is hosted on Vercel, which may log standard web request data (IP address, user agent) for operational and security purposes.',
    'privacy-questions-heading': 'Questions',
    'privacy-questions-body-1': 'Reach out via the channels listed on our',
    'privacy-questions-body-2': 'or Discord.',

    // Accessibility page
    'accessibility-body-1':
      'BetterAborlan.org aims to be usable by as many residents as possible, including people using assistive technology like screen readers and keyboard-only navigation. We build on semantic HTML and the',
    'accessibility-body-2': 'component library, which follows accessible design patterns.',
    'accessibility-body-3':
      'This is an ongoing effort rather than a finished guarantee. If you run into a page or feature that is hard to use with assistive technology, please let us know through our',
    'accessibility-github-issues': 'GitHub issues',
    'accessibility-or': 'or',
    'accessibility-body-4': 'so it can be fixed.',
  },
  fil: {
    'nav-home': 'Tahanan',
    'nav-services': 'Mga Serbisyo',
    'nav-government': 'Pamahalaan',
    'nav-statistics': 'Estadistika',
    'nav-news': 'Balita',
    'nav-contact': 'Makipag-ugnayan',

    'dropdown-certificates': 'Mga Sertipiko',
    'dropdown-business': 'Negosyo',
    'dropdown-tax-payments': 'Pagbabayad ng Buwis',
    'dropdown-social-services': 'Serbisyong Panlipunan',
    'dropdown-health': 'Kalusugan',
    'dropdown-agriculture': 'Agrikultura',
    'dropdown-infrastructure': 'Imprastraktura',
    'dropdown-public-safety': 'Kaligtasang Pampubliko',
    'dropdown-environment': 'Kapaligiran',
    'dropdown-tourism': 'Turismo',
    'dropdown-sports': 'Isports',

    'hero-welcome': 'Maligayang Pagdating sa BetterAborlan.org',
    'hero-subtitle':
      'I-access ang mga serbisyo ng pamahalaan, impormasyon, at mga mapagkukunan para sa mga mamamayan ng Aborlan, Palawan.',
    'hero-find-service': 'Maghanap ng Serbisyo',
    'hero-browse-services': 'Tingnan ang mga Serbisyo',
    'hero-contact-us': 'Makipag-ugnayan',
    'hero-search-placeholder': 'hal., rehistro ng kapanganakan, business permit',
    'hero-popular': 'Sikat:',
    'hero-birth-certificate': 'Rehistrasyon ng Kapanganakan',
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
    'forecast-5day-title': 'Ulat-Panahon sa 5 Araw',
    'forecast-today': 'Ngayon',
    'home-glance-title': 'Aborlan sa Isang Sulyap',
    'home-glance-view-profile': 'Tingnan ang Profile ng Bayan',

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
    'footer-citizens-charter': 'Kartilya ng Mamamayan (Citizen’s Charter)',
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

    // Shared
    'gov-pending-verification': 'Hinihintay ang beripikasyon',
    'home-gov-services-title': 'Mga Serbisyo ng Pamahalaan',
    'home-gov-services-subtitle': 'Mabilis at madaling ma-access ang mga opisyal na serbisyo ng munisipyo.',
    'home-realtime-title': 'Real-Time na Serbisyo ng Datos',
    'home-directory-title': 'Opisyal na Direktoryo',
    'home-directory-subtitle':
      'Hanapin ang impormasyon sa pakikipag-ugnayan ng mga opisyal, tanggapan, at barangay ng Aborlan.',
    'home-directory-btn': 'Tingnan ang Direktoryo',

    // Contact page
    'contact-page-title': 'Makipag-ugnayan',
    'contact-page-subtitle': 'Abutin ang Munisipyo ng Aborlan o ang mga tanggapan nito para sa emerhensiya.',
    'contact-office-hours-pending':
      'Hinihintay ang beripikasyon mula sa bulwagan ng bayan ang oras ng opisina at direktang linya.',
    'contact-hotlines-heading': 'Mga Hotline sa Emerhensiya',
    'contact-hotline-tbd': 'TBD',

    // Government page
    'gov-page-title': 'Pamahalaan ng Aborlan',
    'gov-page-subtitle': 'Kung paano nakaayos ang pamahalaang bayan ng Aborlan.',
    'gov-branch-executive': 'Ehekutibo',
    'gov-branch-executive-desc':
      'Tanggapan ng Punong Bayan at Bise Punong Bayan, at ang kanilang mga departamento.',
    'gov-branch-legislative': 'Lehislatibo',
    'gov-branch-legislative-desc':
      'Sangguniang Bayan ng Aborlan — ang konseho ng bayan na nagpapatupad ng mga ordinansa.',
    'gov-branch-barangays': 'Mga Barangay',
    'gov-branch-barangays-desc': 'ang mga lokal na yunit administratibo ng Aborlan.',
    'gov-barangays-word': 'barangay',
    'gov-elected-officials': 'Mga Halal na Opisyal',
    'gov-elected-officials-subtitle':
      'Ang punong bayan, bise punong bayan, at iba pang lider na kumakatawan sa Aborlan para sa termino 2025–2028.',
    'gov-councilors-pending': 'Hinihintay ang beripikasyon ng listahan ng Sangguniang Bayan.',
    'gov-sb-members': 'Mga Kagawad ng Sangguniang Bayan',
    'gov-officials-footnote':
      'Umupo sa katungkulan ang mga opisyal noong Hunyo 30, 2025. Nakumpirma ang Punong Bayan at Bise Punong Bayan mula sa mga balita; ang mga pangalan ng kagawad ay mula sa unang resulta ng eleksyon at maaaring magbago kapag opisyal nang na-proklama.',
    'gov-barangays-page-subtitle':
      'Binubuo ang Aborlan ng 19 barangay, bawat isa may sariling populasyon batay sa 2024 census.',
    'gov-barangays-directory-pending':
      'Hinihintay ang beripikasyon ng direktoryo ng barangay mula sa opisyal na LGU ng Aborlan o sa listahan ng PSGC (Philippine Standard Geographic Code).',
    'gov-residents-word': 'residente',
    'title-representative': 'Kinatawan, 3rd District ng Palawan',
    'title-sk-president': 'Pangulo ng SK Federation',
    'title-ipmr': 'IPMR (Kinatawan ng mga Katutubong Mamamayan)',

    // Statistics page
    'stats-page-title': 'Isang Tingin sa Aborlan',
    'stats-page-subtitle':
      'Ang populasyon ay mula sa 2024 pambansang census; ang lawak ng lupa at klasipikasyon ng kita ay mula 2020.',
    'stats-households-label': 'Sambahayan',
    'stats-source-psa-2024': 'PSA 2024 Census',
    'stats-income-label': 'Klasipikasyon ng Kita',
    'stats-source-psa-2020': 'PSA 2024 Census',
    'stats-registered-voters-label': 'Nakarehistrong Botante',
    'stats-source-comelec-2025': 'COMELEC, eleksyon 2025',
    'stats-province-label': 'Lalawigan',
    'stats-region-label': 'Rehiyon',
    'stats-population-by-barangay': 'Populasyon ayon sa Barangay',
    'stats-as-of-date': 'noong 31 Hulyo 2025',
    'stats-barangay-table-subtitle':
      'PSA 2024 Census of Population (POPCEN) — eksaktong katumbas ng kabuuang bilang sa itaas.',
    'stats-th-barangay': 'Barangay',
    'stats-th-urban-rural': 'Urban / Rural',
    'stats-th-population': 'Populasyon 2024',
    'stats-th-share': 'Bahagdan sa Kabuuan',
    'stats-urban': 'Urban',
    'stats-rural': 'Rural',

    // Services pages
    'services-page-title': 'Direktoryo ng Serbisyo',
    'services-page-subtitle':
      'Tingnan ang lahat ng serbisyong bayan na inaalok ng LGU Aborlan, ayon sa kategorya.',
    'services-view-all': 'Tingnan Lahat ng',
    'services-empty-title': 'Wala pang nakalista dito',
    'services-empty-desc-1':
      'Walang nakalistang pormal na serbisyo para sa',
    'services-empty-desc-2':
      'sa Citizen’s Charter ng Aborlan — hindi ibig sabihin nito na wala ang LGU maialok, kundi hindi pa ito isang standardized na proseso na aming makumpirma at ma-cite. Kung alam mo ng isa,',
    'services-empty-cta': 'ipaalam sa amin',
    'services-empty-desc-3': 'para maidagdag ito na may tunay na pinagmulan.',
    'services-fee': 'Bayad',
    'services-processing-time': 'Oras ng Pagproseso',
    'services-office': 'Tanggapan',
    'services-view-details': 'Tingnan ang Detalye',
    'services-back-to-directory': 'Bumalik sa Direktoryo ng Serbisyo',

    // Service detail page
    'service-details-heading': 'Ang kailangan mong malaman',
    'service-details-responsible-office': 'Responsableng Tanggapan',
    'service-details-unsourced-1':
      'Ang bayad, oras ng pagproseso, at detalye ng tanggapan ay hindi pa nakukuha mula sa opisyal na LGU ng Aborlan o sa Citizen’s Charter nito — tingnan ang',
    'service-details-unsourced-2':
      'para malaman kung paano direktang maabot ang bulwagan ng bayan sa ngayon.',
    'service-details-back-to': 'Bumalik sa',

    // News section & page
    'news-section-title': 'Pinakabagong Balita',
    'news-section-subtitle': 'Kamakailang balita tungkol sa Aborlan, mula sa Google News.',
    'news-view-all': 'Tingnan lahat ng balita',
    'news-page-title': 'Balita',
    'news-page-subtitle': 'Kamakailang balita tungkol sa Aborlan, Palawan, mula sa Google News.',
    'news-loading': 'Kinakarga ang mga balita…',
    'news-error': 'Hindi ma-load ang balita ngayon. Pakisubukang muli mamaya.',
    'news-empty': 'Walang nakitang kamakailang balita.',
    'news-source-fallback': 'Google News',

    // Search page
    'search-page-title': 'Maghanap',
    'search-page-subtitle': 'Hanapin ang serbisyo ng pamahalaan ayon sa pangalan.',
    'search-label': 'Maghanap ng serbisyo',
    'search-placeholder': 'hal. business permit, barangay clearance...',
    'search-no-results': 'Walang serbisyong tumutugma sa',

    // Sitemap page
    'sitemap-about': 'Tungkol',
    'sitemap-search': 'Maghanap',
    'sitemap-page-subtitle': 'Lahat ng pahina sa BetterAborlan.org, nasa iisang lugar.',
    'sitemap-main-pages': 'Mga Pangunahing Pahina',
    'sitemap-service-categories': 'Mga Kategorya ng Serbisyo',
    'sitemap-legal-support': 'Legal at Suporta',

    // About page
    'about-page-title': 'Tungkol sa BetterAborlan.org',
    'about-page-subtitle':
      'Isang independiyente, boluntaryong-binuong civic transparency portal para sa Munisipyo ng Aborlan, Palawan — isang direktoryo ng mga lokal na serbisyo ng pamahalaan, opisyal, at pampublikong estadistika sa iisang lugar.',
    'about-why-heading': 'Bakit ito umiiral',
    'about-why-body':
      'Hindi dapat kailanganin ng mga residente na maghalungkat sa mga nakakalat na post sa Facebook o lumang flyer para malaman kung aling tanggapan ang humahawak ng isang permit, sino ang kanilang mga halal na opisyal, o anong mga serbisyo ang available. Pinagsasama-sama ng BetterAborlan.org ang impormasyong iyon at pinapanatili itong madaling hanapin.',
    'about-bettergov-heading': 'Batay sa BetterGov.ph',
    'about-bettergov-body-1': 'Ang layout, design system (',
    'about-bettergov-body-2': '), at mga convention ng data ng site na ito ay batay sa',
    'about-bettergov-body-3':
      'bahagi ng mas malawak na pagsisikap ng komunidad na gawing mas accessible ang impormasyon ng pamahalaan ng Pilipinas.',
    'about-data-policy-heading': 'Patakaran sa Data',
    'about-data-policy-body-1':
      'Hindi kami gumagawa o humuhula ng civic data. Kung ang opisyal na datos ay hindi pa available o na-verify, ipinapakita ng site ang tahasang estado ng',
    'about-data-policy-body-2': 'sa halip na palagay na numero. Tingnan ang',
    'about-data-policy-body-3': 'ng proyekto para sa source data at detalye ng kontribusyon.',
    'about-github-repo': 'GitHub repository',

    // FAQ page
    'faq-page-title': 'Mga Madalas Itanong',
    'faq-q1': 'Opisyal ba itong website ng pamahalaan?',
    'faq-a1':
      'Hindi. Ang BetterAborlan.org ay isang independiyente, boluntaryong-binuong civic transparency portal, hindi opisyal na website ng Munisipyo ng Aborlan o ng anumang ahensya ng pamahalaan.',
    'faq-q2': 'Saan nanggagaling ang impormasyon sa site na ito?',
    'faq-a2':
      'Mula sa mga pampublikong opisyal na pinagmulan — ang Sangguniang Bayan, COMELEC, PSA, at ang sariling nailathalang materyales ng LGU Aborlan. Kung hindi pa na-source o na-verify ang isang datos, tahasang sinasabi ito ng pahina sa halip na magpakita ng palagay.',
    'faq-q3': 'May nakita akong mali o lumang impormasyon. Ano ang gagawin ko?',
    'faq-a3':
      'Mangyaring i-report ito sa aming GitHub repository issues o Discord server upang maitama.',
    'faq-q4': 'Maaari ba akong mag-ambag?',
    'faq-a4':
      'Oo. Open source ang proyekto. Tingnan ang GitHub repository kung paano mag-ambag ng code o data.',
    'faq-q5': 'Pinapalitan ba ng site na ito ang mga opisyal na channel ng munisipyo?',
    'faq-a5':
      'Hindi. Para sa mga bindings na transaksyon (permit, sertipiko, bayad), palaging kumpirmahin nang direkta sa kaukulang tanggapan ng munisipyo.',

    // Terms page
    'terms-independent-heading': 'Independiyente, boluntaryong-pinapatakbong proyekto',
    'terms-independent-body':
      'Ang BetterAborlan.org ay isang independiyente, boluntaryong-binuong civic transparency portal. Hindi ito opisyal na website ng Munisipyo ng Aborlan o ng anumang ahensya ng pamahalaan ng Pilipinas, at hindi ito kaakibat o inendorso nila.',
    'terms-no-warranty-heading': 'Walang warranty',
    'terms-no-warranty-body':
      'Ibinibigay ang nilalaman "as is" para sa pangkalahatang layuning pang-impormasyon. Bagaman sinisikap naming panatilihing tumpak ang impormasyon at malinaw na markahan ang hindi na-verify na datos, wala kaming ginagarantiyang kumpleto o tumpak. Para sa mga opisyal na transaksyon, palaging kumpirmahin nang direkta sa kaukulang tanggapan ng munisipyo.',
    'terms-open-source-heading': 'Open source',
    'terms-open-source-body-1':
      'Ang code na nagpapatakbo sa site na ito ay open source (MIT License) at ang nasasakupang data ay may lisensyang CC BY 4.0. Tingnan ang',
    'terms-open-source-body-2': 'para sa mga detalye.',

    // Privacy page
    'privacy-collect-heading': 'Ano ang kinokolekta namin',
    'privacy-collect-body':
      'Hindi nangangailangan ng account ang BetterAborlan.org at hindi humihingi ng personal na impormasyon mula sa mga bisita para mag-browse sa site. Hindi namin ibinebenta o ibinabahagi ang data ng bisita sa mga third party.',
    'privacy-third-party-heading': 'Third-party na data sa site na ito',
    'privacy-third-party-body':
      'Ang ilang widget (panahon, palitan ng pera, mapa) ay direktang tumatawag sa mga pampublikong third-party API mula sa iyong browser para magpakita ng live data. Walang personal na impormasyon ang ipinapadala sa kanila maliban sa karaniwang kasama sa isang standard web request (hal., ang iyong IP address, na hinahawakan ng mga provider na iyon sa ilalim ng kanilang sariling patakaran).',
    'privacy-hosting-heading': 'Hosting',
    'privacy-hosting-body':
      'Naka-host ang site na ito sa Vercel, na maaaring mag-log ng standard web request data (IP address, user agent) para sa operational at security na layunin.',
    'privacy-questions-heading': 'Mga Katanungan',
    'privacy-questions-body-1': 'Makipag-ugnayan sa mga channel na nakalista sa aming',
    'privacy-questions-body-2': 'o Discord.',

    // Accessibility page
    'accessibility-body-1':
      'Nilalayon ng BetterAborlan.org na magamit ng kasing dami ng residente hangga’t maaari, kabilang ang mga gumagamit ng assistive technology tulad ng screen reader at keyboard-only navigation. Gumagamit kami ng semantic HTML at ang',
    'accessibility-body-2': 'component library, na sumusunod sa accessible na disenyo.',
    'accessibility-body-3':
      'Ito ay patuloy na pagsisikap sa halip na tapos nang garantiya. Kung may makita kang pahina o feature na mahirap gamitin gamit ang assistive technology, mangyaring ipaalam sa amin sa aming',
    'accessibility-github-issues': 'GitHub issues',
    'accessibility-or': 'o sa',
    'accessibility-body-4': 'para maayos ito.',
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
