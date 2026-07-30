import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about BetterAborlan.org.',
};

const faqs = [
  {
    q: 'Is this an official government website?',
    a: 'No. BetterAborlan.org is an independent, volunteer-built civic transparency portal, not an official website of the Municipality of Aborlan or any government agency.',
  },
  {
    q: 'Where does the information on this site come from?',
    a: 'From publicly available official sources — the Sangguniang Bayan, COMELEC, PSA, and the Aborlan LGU’s own published materials. Where a figure isn’t yet sourced or verified, the page says so explicitly instead of showing a guess.',
  },
  {
    q: 'I found an error or outdated information. What do I do?',
    a: 'Please report it via our GitHub repository issues or Discord server so it can be corrected.',
  },
  {
    q: 'Can I contribute?',
    a: 'Yes. The project is open source. See the GitHub repository for how to contribute code or data.',
  },
  {
    q: 'Does this site replace official municipal channels?',
    a: 'No. For binding transactions (permits, certificates, payments), always confirm directly with the relevant municipal office.',
  },
];

export default function FaqPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="doc-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((item) => (
            <div key={item.q} className="surface-card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 8 }}>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
