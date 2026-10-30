/**
 * Reusable KanbanColumn Component
 * Represents a single workflow stage containing a list of TaskCards.
 */

import TaskCard from './ui/TaskCard';

function KanbanColumn({ column, tasks = [] }) {
  const { title, icon: Icon, color } = column;

  return (
    <section className="kanban-column" aria-label={`${title} Column (${tasks.length} tasks)`}>
      {/* Column Header */}
      <header className="kanban-column-header">
        <div className="kanban-column-title-group">
          {Icon && (
            <span className="kanban-column-icon" style={{ color }} aria-hidden="true">
              <Icon size={16} strokeWidth={2.5} />
            </span>
          )}
          <h3 className="kanban-column-title">{title}</h3>
        </div>
        <span className="kanban-column-count">{tasks.length}</span>
      </header>

      {/* Column Accent Bar */}
      <div className="kanban-column-bar" style={{ backgroundColor: color }} aria-hidden="true" />

      {/* Task Cards Stack */}
      <div className="kanban-cards-stack">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="kanban-empty-state">No tasks in this stage</div>
        )}
      </div>
    </section>
  );
}

export default KanbanColumn;
