// Trimmed, client-bundled subset of civic data used for the chat widget's
// instant-answer shortcut: common questions get answered directly in the
// browser, with zero network/LLM round-trip. Anything that doesn't match
// confidently falls through to the streaming /api/chat endpoint instead.
//
// Kept deliberately slim (no descriptions) to minimize client bundle size.
// Source of truth for all figures is data/services.json, data/officials.json,
// data/demographics.json, and src/data/hotlines.ts — re-sync manually if
// those change.

export interface QuickService {
  id: string;
  title: string;
  fee: string | null;
  processingTime: string;
  office: string;
  keywords: string[];
}

export const quickServices: QuickService[] = [
  { id: 'birth-certificate', title: 'Birth Registration', fee: '₱25.00', processingTime: '25 minutes (on-time registration)', office: "Municipal Civil Registrar's Office (MCR)", keywords: ['birth certificate', 'birth registration', 'register birth'] },
  { id: 'marriage-certificate', title: 'Marriage Registration', fee: '₱25.00 (on-time) / ₱75.00 (delayed)', processingTime: 'Same-day (on-time); up to 11 days (delayed)', office: "Municipal Civil Registrar's Office (MCR)", keywords: ['marriage certificate', 'marriage registration', 'register marriage', 'get married'] },
  { id: 'death-certificate', title: 'Death Registration', fee: '₱45.00 (on-time) / ₱75.00 (delayed)', processingTime: '50 minutes', office: "Municipal Civil Registrar's Office (MCR)", keywords: ['death certificate', 'death registration', 'register death'] },
  { id: 'mayors-clearance', title: "Mayor's Clearance", fee: '₱75.00', processingTime: '23 minutes', office: 'Office of the Municipal Mayor (OMM)', keywords: ["mayor's clearance", 'mayors clearance'] },
  { id: 'business-permit-new', title: 'Business Permit (New)', fee: 'Varies by business type and gross receipts', processingTime: '4 hours 30 minutes (regular) / 7 hours 45 minutes (peak)', office: 'BPLO (Office of the Municipal Mayor)', keywords: ['new business permit', 'business permit new', 'start a business', 'register a business'] },
  { id: 'business-permit-renewal', title: 'Business Permit Renewal', fee: 'Varies by business type and gross receipts', processingTime: '4 hours 30 minutes (regular) / 7 hours 45 minutes (peak)', office: 'BPLO (Office of the Municipal Mayor)', keywords: ['renew business permit', 'business permit renewal', 'renewal of business permit'] },
  { id: 'real-property-tax', title: 'Real Property Tax', fee: '2% of assessed value (10–20% discount for early payment)', processingTime: '35 minutes', office: "Municipal Treasurer's Office (MTO)", keywords: ['real property tax', 'amilyar', 'property tax', 'land tax'] },
  { id: 'cedula', title: 'Cedula (Community Tax Certificate)', fee: 'Individual: ₱5.00 basic + variable; Corporation: ₱500.00 basic + variable', processingTime: '6 minutes', office: "Municipal Treasurer's Office (MTO)", keywords: ['cedula', 'community tax certificate', 'community tax'] },
  { id: 'senior-citizen-id', title: 'Senior Citizen ID', fee: null, processingTime: '16 minutes', office: 'MSWDO – Office for the Senior Citizen Affairs (OSCA)', keywords: ['senior citizen id', 'senior id', 'osca'] },
  { id: 'pwd-id', title: 'PWD ID', fee: null, processingTime: '16 minutes', office: 'Municipal Social Welfare and Development Office (MSWDO)', keywords: ['pwd id', 'persons with disability id', 'disability id'] },
  { id: 'water-new-connection', title: 'New Water Connection', fee: '₱1,500.00', processingTime: '1 day, 1 hour, 8 minutes', office: 'AWSMOU', keywords: ['new water connection', 'water connection', 'apply for water'] },
  { id: 'water-billing', title: 'Water Billing', fee: 'Based on metered usage', processingTime: '8 minutes', office: 'AWSMOU', keywords: ['water bill', 'water billing'] },
  { id: 'building-permit', title: 'Building Permit', fee: 'Varies by project (National Building Code)', processingTime: '1 hour 20 minutes (after endorsements secured)', office: 'Municipal Engineering Office (MEO)', keywords: ['building permit'] },
  { id: 'zoning-clearance', title: 'Zoning Clearance', fee: 'Varies (2018 Revenue Code)', processingTime: '3 days, 53 minutes', office: 'Municipal Planning and Development Office (MPDO)', keywords: ['zoning clearance'] },
];

export const quickFacts = {
  mayor: 'Lito O. Tito',
  viceMayor: 'Marvin C. Madeja',
  population: '39,972 (PSA 2024 Census)',
  barangayCount: 19,
  province: 'Palawan',
  region: 'MIMAROPA (Region IV-B)',
};

const HOTLINE_KEYWORDS = ['hotline', 'emergency number', 'emergency hotline', 'contact number', 'phone number'];
const MAYOR_KEYWORDS = ['who is the mayor', 'current mayor', "mayor's name", 'mayor of aborlan'];
const VICE_MAYOR_KEYWORDS = ['vice mayor', 'vice-mayor'];
const POPULATION_KEYWORDS = ['population', 'how many people', 'how many residents'];
const BARANGAY_COUNT_KEYWORDS = ['how many barangay', 'number of barangay'];

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

// Small pool of conversational openers so instant answers don't read like a
// database dump — picked at random per answer so repeat questions in the
// same session don't feel like a canned script.
const OPENERS = [
  'Sure thing!',
  'Good question —',
  'Happy to help!',
  'Here you go —',
  'Got it —',
  "Sure, here's what I have:",
];

function pickOpener(): string {
  return OPENERS[Math.floor(Math.random() * OPENERS.length)];
}

// Returns a ready-to-show answer string for confidently-matched common
// questions, or null when the widget should fall through to the streaming
// API instead. Deliberately conservative — a false "instant" match that's
// wrong is worse than one extra API call.
export function findQuickAnswer(question: string): string | null {
  const q = normalize(question);
  if (q.length < 3) return null;

  if (HOTLINE_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Emergency hotlines: National Emergency 911, PNP 0998-598-5850, BFP (Fire) 0915-603-1372, MDRRMO 0912-120-2000. [See all hotlines](/contact)`;
  }

  if (MAYOR_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} The current Municipal Mayor of Aborlan is ${quickFacts.mayor}. [Local Officials](/government)`;
  }

  if (VICE_MAYOR_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} The current Municipal Vice Mayor of Aborlan is ${quickFacts.viceMayor}. [Local Officials](/government)`;
  }

  if (POPULATION_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Aborlan's population is ${quickFacts.population}. [Municipal Statistics](/statistics)`;
  }

  if (BARANGAY_COUNT_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Aborlan has ${quickFacts.barangayCount} barangays. [Municipal Statistics](/statistics)`;
  }

  const serviceMatch = quickServices.find((s) => s.keywords.some((k) => q.includes(k)));
  if (serviceMatch) {
    const feeText = serviceMatch.fee ? `Fee: ${serviceMatch.fee}.` : 'No fee.';
    return `${pickOpener()} ${serviceMatch.title}: ${feeText} Processing time: ${serviceMatch.processingTime}. Office: ${serviceMatch.office}. [View details](/service-details/${serviceMatch.id})`;
  }

  return null;
}
