/**
 * Reusable TaskList Component
 * Renders the tabular List View for TaskFlow, displaying tasks across all workflow stages.
 */

import { ListFilter, Plus } from 'lucide-react';
import TaskRow from './ui/TaskRow';

function TaskList({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onStatusChange,
  onOpenAddModal
}) {
  // Empty state when no tasks exist
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
