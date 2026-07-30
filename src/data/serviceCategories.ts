export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  items: string[];
  href: string;
}

// Bullet items are the standard-nationwide service types already listed in
// data/services.json — no Aborlan-specific facts (fees, offices) fabricated here.
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'certificates',
    title: 'Certificates & Vital Records',
    icon: 'bi-file-earmark-text-fill',
    items: ['Birth Certificate', 'Marriage Certificate', 'Death Certificate'],
    href: '/services/certificates',
  },
  {
    id: 'business',
    title: 'Business & Trade',
    icon: 'bi-shop',
    items: ['Business Permit (New)', 'Business Permit Renewal'],
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
    items: ['Senior Citizen ID', 'PWD ID', 'Medical / Financial Assistance'],
    href: '/services/social-services',
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: 'bi-heart-pulse-fill',
    items: ['Medical Consultation', 'Rural Health Unit Services'],
    href: '/services/health',
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    icon: 'bi-flower1',
    items: ['Seedling / Farm Input Distribution', 'RSBSA Registration'],
    href: '/services/agriculture',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: 'bi-cone-striped',
    items: ['Building Permit', 'Occupancy Permit'],
    href: '/services/infrastructure',
  },
  {
    id: 'education',
    title: 'Education',
    icon: 'bi-mortarboard-fill',
    items: ['Scholarship Program', 'Educational Assistance'],
    href: '/services/education',
  },
  {
    id: 'public-safety',
    title: 'Public Safety',
    icon: 'bi-shield-fill-check',
    items: ['Disaster Preparedness & Response', 'Emergency Hotlines'],
    href: '/services/public-safety',
  },
  {
    id: 'environment',
    title: 'Environment',
    icon: 'bi-recycle',
    items: ['Waste Collection Schedule', 'Waste Segregation Guidelines'],
    href: '/services/environment',
  },
];
