import servicesData from '../../data/services.json';
import officialsData from '../../data/officials.json';
import demographicsData from '../../data/demographics.json';
import barangaysData from '../../data/barangays.json';
import { hotlines } from '../data/hotlines';

interface Service {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  description: string;
  fee: string;
  processingTime: string;
  office: string;
}

const services = servicesData.services as Service[];

// Services shown by default when the question doesn't match any keywords —
// the handful a resident is statistically most likely to ask about.
const DEFAULT_SERVICE_IDS = [
  'birth-certificate',
  'marriage-certificate',
  'death-certificate',
  'mayors-clearance',
  'business-permit-new',
  'business-permit-renewal',
  'zoning-clearance',
  'real-property-tax',
];

// Cap how many services get inlined into the prompt regardless of match
// count, so a broad query can't blow the token budget back open.
const MAX_SERVICES_IN_CONTEXT = 12;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

// Keyword-matches the user's question against each service's title,
// category, and description. Falls back to a curated default subset when
// nothing matches, so the prompt is never empty but is also never "all 80
// services" — that alone was eating most of the free-tier token budget.
function findRelevantServices(question: string): Service[] {
  const words = tokenize(question);
  if (words.length === 0) {
    return services.filter((s) => DEFAULT_SERVICE_IDS.includes(s.id));
  }

  const scored = services
    .map((service) => {
      const haystack = `${service.title} ${service.category} ${service.description}`.toLowerCase();
      const score = words.reduce((acc, w) => (haystack.includes(w) ? acc + 1 : acc), 0);
      return { service, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return services.filter((s) => DEFAULT_SERVICE_IDS.includes(s.id));
  }

  return scored.slice(0, MAX_SERVICES_IN_CONTEXT).map((s) => s.service);
}

function formatServices(list: Service[]): string {
  return list
    .map(
      (s) =>
        `- ${s.title} (${s.category}): ₱fee ${s.fee}, ${s.processingTime}, at ${s.office}. ${s.description}`,
    )
    .join('\n');
}

function formatOfficials(): string {
  const o = officialsData;
  const councilors = o.councilors.map((c) => c.name).join(', ');
  return [
    `Mayor: ${o.mayor.name}`,
    `Vice Mayor: ${o.vice_mayor.name}`,
    `Representative (3rd District of Palawan): ${o.representative.name}`,
    `Sangguniang Bayan Members: ${councilors}`,
    `SK Federation President: ${o.sk_federation_president.name}`,
    `IPMR: ${o.ipmr.name}`,
  ].join('\n');
}

function formatDemographics(): string {
  const d = demographicsData;
  return [
    `Population: ${d.population.toLocaleString()} (${d.population_source}, ${d.population_year})`,
    `Households (2024): ${d.households_2024.toLocaleString()}`,
    `Registered voters (2025): ${d.registered_voters_2025.toLocaleString()}`,
    `Land area: ${d.land_area_km2} km²`,
    `Income classification: ${d.income_classification}`,
    `Number of barangays: ${d.barangay_count}`,
    `Province: ${d.province}, Region: ${d.region}`,
  ].join('\n');
}

function formatBarangays(): string {
  return barangaysData.barangays
    .map((b) => `${b.name} (${b.urban_rural}, pop. ${b.population_2024.toLocaleString()})`)
    .join('; ');
}

function formatHotlines(): string {
  return hotlines
    .map((h) => `${h.label}: ${h.numbers ? h.numbers.join(' / ') : 'not available'}`)
    .join('\n');
}

// Builds the system prompt for a given user question. Keeps the prompt as
// small as possible: officials/demographics/barangays/hotlines are cheap
// (a few hundred tokens total) so they're always included in full; services
// are the expensive part (80 entries, ~9K tokens if inlined whole) so only
// the ones relevant to the question are included, capped at
// MAX_SERVICES_IN_CONTEXT.
export function buildSystemPrompt(question: string): string {
  const relevantServices = findRelevantServices(question);

  return `You are the BetterAborlan Assistant, a helpful civic information assistant for the Municipality of Aborlan, Palawan, Philippines. You answer questions using ONLY the data provided below, which comes from official sources (the Municipal Citizen's Charter, PSA census data, and COMELEC/LGU records).

Rules:
- Answer only from the data below. If the answer isn't in it, say you don't have that information and suggest contacting the Municipal Hall directly, or checking the relevant page on the site.
- Never invent fees, processing times, names, or numbers.
- Keep answers short and direct — a few sentences, not essays.
- If asked about something clearly outside Aborlan civic matters, politely redirect to what you can help with.
- Amounts are in Philippine Pesos (₱).

## Local Government Officials
${formatOfficials()}

## Municipal Demographics
${formatDemographics()}

## Barangays (19 total)
${formatBarangays()}

## Emergency Hotlines
${formatHotlines()}

## Relevant Citizen Services
${formatServices(relevantServices)}
`;
}
