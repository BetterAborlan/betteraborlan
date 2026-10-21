import servicesData from '../../data/services.json';
import officialsData from '../../data/officials.json';
import demographicsData from '../../data/demographics.json';
import { hotlines } from '../data/hotlines';
import { QUICK_SERVICE_KEYWORDS, type QuickAnswerData } from '../data/chat-quick-answers';

// How many hotlines the instant "hotline" answer lists inline — the rest are
// one click away on /contact.
const HOTLINES_IN_ANSWER = 4;

// Server-only: builds the chat widget's instant-answer dataset from the same
// source files the rest of the site (and /api/chat) reads, keeping only the
// fields findQuickAnswer needs so the client never bundles services.json.
export function buildQuickAnswerData(): QuickAnswerData {
  const services = Object.entries(QUICK_SERVICE_KEYWORDS).map(([id, keywords]) => {
    const service = servicesData.services.find((s) => s.id === id);
    if (!service) {
      throw new Error(`QUICK_SERVICE_KEYWORDS references unknown service id "${id}"`);
    }
    return {
      id,
      title: service.title,
      fee: service.fee,
      processingTime: service.processingTime,
      office: service.office,
      keywords,
    };
  });

  return {
    services,
    mayor: officialsData.mayor.name,
    viceMayor: officialsData.vice_mayor.name,
    population: `${demographicsData.population.toLocaleString('en-US')}, per the ${demographicsData.population_source}`,
    barangayCount: demographicsData.barangay_count,
    hotlines: hotlines
      .filter((h) => h.numbers)
      .slice(0, HOTLINES_IN_ANSWER)
      .map((h) => `${h.label} ${h.numbers![0]}`),
  };
}
