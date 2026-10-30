/**
 * DashboardStats Component
 * Renders the dashboard statistics grid dynamically computed from current tasks.
 */

import StatCard from './ui/StatCard';
import { calculateDashboardStats, DASHBOARD_STATS } from '../data/dashboardStats';

function DashboardStats({ tasks, stats }) {
  // Use dynamically calculated statistics if tasks are provided; otherwise fallback to stats prop or defaults
  const displayStats = tasks ? calculateDashboardStats(tasks) : (stats || DASHBOARD_STATS);

  return (
    <section className="stats-section" aria-label="Overview Statistics">
      <div className="stats-grid">
        {displayStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
            subtext={stat.subtext}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;
