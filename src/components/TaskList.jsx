/**
 * Reusable TaskList Component
 * Renders the tabular List View for TaskFlow, displaying tasks across all workflow stages.
 */

import { ListFilter, Plus, SearchX, RotateCcw } from 'lucide-react';
import TaskRow from './ui/TaskRow';

function TaskList({
  tasks = [],
  categories = [],
  isFiltered = false,
  onClearFilters,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onStatusChange,
  onOpenAddModal
}) {
  // If no tasks match current filters, display helpful filter empty state
  if (tasks.length === 0 && isFiltered) {
    return (
      <div className="filter-empty-state" role="region" aria-label="No matching tasks">
        <div className="filter-empty-icon-box" aria-hidden="true">
          <SearchX size={32} strokeWidth={1.75} />
        </div>
        <div className="filter-empty-text">
          <h3 className="filter-empty-title">No tasks match your filters</h3>
          <p className="filter-empty-desc">
            Try adjusting your search keywords or filter criteria to find the tasks you are looking for.
          </p>
        </div>
        {onClearFilters && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onClearFilters}
          >
            <RotateCcw size={14} strokeWidth={2} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    );
  }

  // Empty state when no tasks exist in the entire application
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty" role="region" aria-label="Empty task list">
        <div className="task-list-empty-icon" aria-hidden="true">
          <ListFilter size={28} strokeWidth={1.75} />
        </div>
        <div className="task-list-empty-text">
          <h3 className="task-list-empty-title">No tasks in list</h3>
          <p className="task-list-empty-desc">
            No tasks found. Create a new task to organize your daily workflow.
          </p>
        </div>
        {onOpenAddModal && (
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddModal}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Task</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list-container" role="region" aria-label="Task List View">
      {/* Table-like Grid Header perfectly aligned with task rows */}
      <header className="task-list-table-header" aria-hidden="true">
        <span className="col-header col-header-check"></span>
        <span className="col-header col-header-main">Task & Description</span>
        <span className="col-header col-header-category">Category</span>
        <span className="col-header col-header-priority">Priority</span>
        <span className="col-header col-header-status">Status</span>
        <span className="col-header col-header-due">Due Date</span>
        <span className="col-header col-header-actions">Actions</span>
      </header>

      {/* Task Rows Stack */}
      <div className="task-rows-stack" role="list">
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            categories={categories}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onComplete={onCompleteTask}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
