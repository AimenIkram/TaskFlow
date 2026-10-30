/**
 * Reusable TaskRow Component
 * Renders an individual task row within the List View.
 * Displays title, compact description, category, priority, status selector, due date, and actions in aligned grid cells.
 */

import { Calendar, Pencil, Trash2, Check, AlertCircle } from 'lucide-react';
import { TASK_STATUS, formatDueDate, isTaskOverdue } from '../../data/tasks';

function TaskRow({
  task,
  categories = [],
  onEdit,
  onDelete,
  onComplete,
  onStatusChange
}) {
  const { title, description, priority, dueDate, category, categoryId, status } = task;
  const isCompleted = status === TASK_STATUS.COMPLETED;
  const isOverdue = isTaskOverdue(task);

  // Resolve category from shared categories collection via categoryId with name fallback
  const matchedCategory = categories.find(
    (c) => c.id === categoryId || (category && c.name.toLowerCase() === category.toLowerCase())
  );

  return (
    <article
      className={`task-row${isCompleted ? ' task-row--completed' : ''}${isOverdue ? ' task-row--overdue' : ''}`}
      aria-label={`Task: ${title}`}
    >
      {/* Col 1: Complete / Done Status Indicator Cell (always present to preserve title alignment) */}
      <div className="task-row-cell task-row-cell--check">
        {onComplete && !isCompleted ? (
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
        ) : (
          <span
            className="task-completed-check-icon"
            title="Completed"
            aria-label="Completed"
          >
            <Check size={13} strokeWidth={2.5} />
          </span>
        )}
      </div>

      {/* Col 2: Task Title and Compact Description */}
      <div className="task-row-cell task-row-cell--main">
        <span className={`task-row-title${isCompleted ? ' task-row-title--completed' : ''}`}>
          {title}
        </span>
        {description && (
          <p className="task-row-desc" title={description}>
            {description}
          </p>
        )}
      </div>

      {/* Col 3: Category */}
      <div className="task-row-cell task-row-cell--category">
        {matchedCategory ? (
          <span
            className="task-category-badge"
            style={{
              backgroundColor: `${matchedCategory.color}15`,
              color: matchedCategory.color,
              borderColor: `${matchedCategory.color}35`
            }}
          >
            <span
              className="category-dot"
              style={{ backgroundColor: matchedCategory.color }}
              aria-hidden="true"
            />
            <span>{matchedCategory.name}</span>
          </span>
        ) : category ? (
          <span className="task-category-badge">{category}</span>
        ) : (
          <span className="task-empty-cell">—</span>
        )}
      </div>

      {/* Col 4: Priority */}
      <div className="task-row-cell task-row-cell--priority">
        {priority ? (
          <span className={`task-priority-badge priority-${priority.toLowerCase()}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}
          </span>
        ) : (
          <span className="task-empty-cell">—</span>
        )}
      </div>

      {/* Col 5: Status */}
      <div className="task-row-cell task-row-cell--status">
        {onStatusChange && (
          <select
            className={`task-status-select task-status-select--${status}`}
            value={status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(task, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Change status for "${title}"`}
            title="Change status"
          >
            <option value={TASK_STATUS.TODO}>To Do</option>
            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={TASK_STATUS.COMPLETED}>Completed</option>
          </select>
        )}
      </div>

      {/* Col 6: Due Date */}
      <div className="task-row-cell task-row-cell--due">
        {dueDate ? (
          <div className="task-row-due-group">
            <span
              className={`task-due-date${isOverdue ? ' task-due-date--overdue' : ''}`}
              title={isOverdue ? `Overdue (was due ${dueDate})` : `Due ${dueDate}`}
            >
              <Calendar size={13} strokeWidth={2} aria-hidden="true" />
              <span>{formatDueDate(dueDate)}</span>
            </span>
            {isOverdue && (
              <span className="task-overdue-badge task-overdue-badge--sm" title="Task is overdue">
                <AlertCircle size={10} strokeWidth={2.5} aria-hidden="true" />
                <span>Overdue</span>
              </span>
            )}
          </div>
        ) : (
          <span className="task-empty-cell">—</span>
        )}
      </div>

      {/* Col 7: Actions */}
      <div className="task-row-cell task-row-cell--actions">
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
    </article>
  );
}

export default TaskRow;
