/**
 * Reusable TaskCard Component
 * Displays a single task item inside a Kanban column with an edit action.
 */

import { Calendar, Pencil, Trash2, Check } from 'lucide-react';

function TaskCard({ task, onEdit, onDelete, onComplete }) {
  const { title, description, priority, dueDate, category, status } = task;
  const isCompleted = status === 'completed';

  return (
    <article
      className={`task-card${isCompleted ? ' task-card--completed' : ''}`}
      aria-label={`Task: ${title}`}
    >
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

      {/* Card Footer: Metadata (Due Date) & Actions */}
      <footer className="task-card-footer">
        <span className="task-due-date" title={`Due ${dueDate}`}>
          <Calendar size={13} strokeWidth={2} aria-hidden="true" />
          <span>{dueDate}</span>
        </span>

        <div className="task-card-actions">
          {/* Mark as completed: only rendered if task is not already completed */}
          {onComplete && !isCompleted && (
            <button
              type="button"
              className="task-action-btn task-action-btn--complete"
              onClick={(e) => {
                e.stopPropagation();
                onComplete(task);
              }}
              aria-label={`Mark task as completed: ${title}`}
              title="Mark as completed"
            >
              <Check size={13} strokeWidth={2.5} />
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              className="task-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              aria-label={`Edit task: ${title}`}
              title="Edit task"
            >
              <Pencil size={13} strokeWidth={2} />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="task-action-btn task-action-btn--delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
              aria-label={`Delete task: ${title}`}
              title="Delete task"
            >
              <Trash2 size={13} strokeWidth={2} />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}

export default TaskCard;
