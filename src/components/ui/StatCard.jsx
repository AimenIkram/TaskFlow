/**
 * Reusable StatCard Component
 * Displays a single key performance or workflow metric.
 */

function StatCard({
  label,
  value,
  icon: Icon,
  variant = 'total',
  subtext
}) {
  return (
    <article className={`stat-card stat-card--${variant}`} aria-label={`${label}: ${value}`}>
      <header className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        {Icon && (
          <div className="stat-card-icon" aria-hidden="true">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </header>

      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        {subtext && <span className="stat-card-subtext">{subtext}</span>}
      </div>
    </article>
  );
}

export default StatCard;
