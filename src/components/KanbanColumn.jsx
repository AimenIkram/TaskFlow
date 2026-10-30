/**
 * Reusable KanbanColumn Component
 * Represents a single workflow stage containing a list of TaskCards.
 */

import { Inbox } from 'lucide-react';
import TaskCard from './ui/TaskCard';

function KanbanColumn({
  column,
  tasks = [],
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onStatusChange
}) {
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
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onComplete={onCompleteTask}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="kanban-empty-state">
            <Inbox size={22} strokeWidth={1.5} className="kanban-empty-icon" aria-hidden="true" />
            <p className="kanban-empty-title">No tasks in {title.toLowerCase()}</p>
            <span className="kanban-empty-hint">Tasks in this stage will appear here</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default KanbanColumn;
