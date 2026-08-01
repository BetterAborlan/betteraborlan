export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  items: string[];
  href: string;
}

// Bullet items are real service titles already listed in data/services.json,
// sourced from the Aborlan Citizen's Charter 2025 — kept in sync with that file.
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'certificates',
    title: 'Certificates & Vital Records',
    icon: 'bi-file-earmark-text-fill',
    items: ['Birth Registration', 'Marriage Registration', "Mayor's Clearance"],
    href: '/services/certificates',
  },
  {
    id: 'business',
    title: 'Business & Trade',
    icon: 'bi-shop',
    items: ['Business Permit (New)', 'Business Permit Renewal', 'Tricycle Operator’s Permit'],
    href: '/services/business',
  },
  {
    id: 'tax-payments',
    title: 'Taxation & Payments',
    icon: 'bi-cash-coin',
    items: ['Real Property Tax', 'Cedula (Community Tax Certificate)'],
    href: '/services/tax-payments',
  },
  {
    id: 'social-services',
    title: 'Social Services',
    icon: 'bi-people-fill',
    items: ['Senior Citizen ID', 'PWD ID', 'Solo Parent Program'],
    href: '/services/social-services',
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: 'bi-heart-pulse-fill',
    items: ['Medical Consultation', 'Immunization', 'Maternal Health Care'],
    href: '/services/health',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    icon: 'bi-flower1',
    items: ['RSBSA Registration', 'Tractor Services', 'Boat Registration'],
    href: '/services/agriculture',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: 'bi-cone-striped',
    items: ['Building Permit', 'Occupancy Permit', 'New Water Connection'],
    href: '/services/infrastructure',
  },
  {
    id: 'public-safety',
    title: 'Public Safety',
    icon: 'bi-shield-fill-check',
    items: ['Disaster Preparedness Training', 'Flood Control / Mitigation', 'Emergency Hotlines'],
    href: '/services/public-safety',
  },
  {
    id: 'environment',
    title: 'Environment',
    icon: 'bi-recycle',
    items: ['Waste Collection Schedule', 'Chainsaw Registration'],
    href: '/services/environment',
  },
  {
    id: 'tourism',
    title: 'Tourism',
    icon: 'bi-compass-fill',
    items: ['DOT Accreditation Assistance', 'Local/Foreign Guest Assistance'],
    href: '/services/tourism',
  },
  {
    id: 'sports',
    title: 'Sports',
    icon: 'bi-trophy-fill',
    items: ['Request for Sports Equipment', 'Availing of Sports Services'],
    href: '/services/sports',
  },
];
