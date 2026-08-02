export default function StatCard({
  icon,
  value,
  label,
  source,
}: {
  icon: string;
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="surface-card home-stat-card" style={{ padding: 24, textAlign: 'center' }}>
      <div className="home-stat-card-icon">
        <i className={`bi ${icon}`} aria-hidden="true"></i>
      </div>
      <div className="home-stat-card-content">
        <span className="home-stat-card-value">{value}</span>
        <span className="home-stat-card-label">{label}</span>
        <span className="home-stat-card-source">{source}</span>
      </div>
    </div>
  );
}
