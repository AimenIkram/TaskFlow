/**
 * Reusable TaskCard Component
 * Displays a single task item inside a Kanban column.
 */

import { Calendar } from 'lucide-react';

function TaskCard({ task }) {
  const { title, description, priority, dueDate, category } = task;

  return (
    <article className="task-card" aria-label={`Task: ${title}`}>
      {/* Card Header: Category & Priority Badge */}
      <div className="task-card-header">
        {category && <span className="task-category-badge">{category}</span>}
        <span className={`task-priority-badge priority-${priority}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      {/* Card Body: Title & Description */}
      <div className="task-card-body">
        <h4 className="task-card-title">{title}</h4>
        <p className="task-card-desc">{description}</p>
      </div>

      {/* Card Footer: Metadata (Due Date) */}
      <footer className="task-card-footer">
        <span className="task-due-date" title={`Due ${dueDate}`}>
          <Calendar size={13} strokeWidth={2} aria-hidden="true" />
          <span>{dueDate}</span>
        </span>
      </footer>
    </article>
  );
}

export default TaskCard;
