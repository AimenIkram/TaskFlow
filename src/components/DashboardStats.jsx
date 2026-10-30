/**
 * DashboardStats Component
 * Renders the dashboard statistics grid using data-driven mapping over DASHBOARD_STATS.
 */

import StatCard from './ui/StatCard';
import { DASHBOARD_STATS } from '../data/dashboardStats';

function DashboardStats({ stats = DASHBOARD_STATS }) {
  return (
    <section className="stats-section" aria-label="Overview Statistics">
      <div className="stats-grid">
        {stats.map((stat) => (
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
