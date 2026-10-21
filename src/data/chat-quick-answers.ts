// Instant-answer shortcut for the chat widget: common questions get answered
// directly in the browser, with zero network/LLM round-trip. Anything that
// doesn't match confidently falls through to the streaming /api/chat
// endpoint instead.
//
// Only the matching rules live here. The figures themselves (fees, times,
// offices, officials, hotlines) are derived server-side from data/*.json and
// src/data/hotlines.ts by src/lib/chat-quick-data.ts and passed down as a
// prop — so they can't drift from what the rest of the site shows, and the
// client only receives the slim fields, not the full services.json.

export interface QuickService {
  id: string;
  title: string;
  fee: string | null;
  processingTime: string;
  office: string;
  keywords: string[];
}

export interface QuickAnswerData {
  services: QuickService[];
  mayor: string;
  viceMayor: string;
  population: string;
  barangayCount: number;
  hotlines: string[];
}

// Service id -> phrases that confidently identify it. Ids must exist in
// data/services.json; chat-quick-data.ts throws at build time if one doesn't.
export const QUICK_SERVICE_KEYWORDS: Record<string, string[]> = {
  'birth-certificate': ['birth certificate', 'birth registration', 'register birth'],
  'marriage-certificate': ['marriage certificate', 'marriage registration', 'register marriage', 'get married'],
  'death-certificate': ['death certificate', 'death registration', 'register death'],
  'mayors-clearance': ["mayor's clearance", 'mayors clearance'],
  'business-permit-new': ['new business permit', 'business permit new', 'start a business', 'register a business'],
  'business-permit-renewal': ['renew business permit', 'business permit renewal', 'renewal of business permit'],
  'real-property-tax': ['real property tax', 'amilyar', 'property tax', 'land tax'],
  cedula: ['cedula', 'community tax certificate', 'community tax'],
  'senior-citizen-id': ['senior citizen id', 'senior id', 'osca'],
  'pwd-id': ['pwd id', 'persons with disability id', 'disability id'],
  'water-new-connection': ['new water connection', 'water connection', 'apply for water'],
  'water-billing': ['water bill', 'water billing'],
  'building-permit': ['building permit'],
  'zoning-clearance': ['zoning clearance'],
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
export function findQuickAnswer(question: string, data: QuickAnswerData): string | null {
  const q = normalize(question);
  if (q.length < 3) return null;

  if (HOTLINE_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Emergency hotlines: ${data.hotlines.join(', ')}. [See all hotlines](/contact)`;
  }

  if (MAYOR_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} The current Municipal Mayor of Aborlan is ${data.mayor}. [Local Officials](/government)`;
  }

  if (VICE_MAYOR_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} The current Municipal Vice Mayor of Aborlan is ${data.viceMayor}. [Local Officials](/government)`;
  }

  if (POPULATION_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Aborlan's population is ${data.population}. [Municipal Statistics](/statistics)`;
  }

  if (BARANGAY_COUNT_KEYWORDS.some((k) => q.includes(k))) {
    return `${pickOpener()} Aborlan has ${data.barangayCount} barangays. [Municipal Statistics](/statistics)`;
  }

  const serviceMatch = data.services.find((s) => s.keywords.some((k) => q.includes(k)));
  if (serviceMatch) {
    const feeText = serviceMatch.fee ? `Fee: ${serviceMatch.fee}.` : 'No fee.';
    return `${pickOpener()} ${serviceMatch.title}: ${feeText} Processing time: ${serviceMatch.processingTime}. Office: ${serviceMatch.office}. [View details](/service-details/${serviceMatch.id})`;
  }

  return null;
}
