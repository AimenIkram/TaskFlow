/**
 * KanbanBoard Component
 * Renders the 3-column Kanban board by mapping over KANBAN_COLUMNS and SAMPLE_TASKS.
 */

import { FolderKanban, Plus, SearchX, RotateCcw } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import { KANBAN_COLUMNS, SAMPLE_TASKS } from '../data/tasks';

function KanbanBoard({
  tasks = SAMPLE_TASKS,
  categories = [],
  isFiltered = false,
  onClearFilters,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onOpenAddModal,
  onStatusChange
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

  // If no tasks exist across the entire board, display a helpful board empty state
  if (tasks.length === 0) {
    return (
      <div className="kanban-board-empty" role="region" aria-label="Empty task board">
        <div className="board-empty-icon-box" aria-hidden="true">
          <FolderKanban size={32} strokeWidth={1.75} />
        </div>
        <div className="board-empty-text-group">
          <h3 className="board-empty-title">No tasks yet</h3>
          <p className="board-empty-desc">
            Your board is currently empty. Get started by creating your first task to organize your workflow.
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
    <div className="kanban-board" role="region" aria-label="Task Management Kanban Board">
      {KANBAN_COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            categories={categories}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onStatusChange={onStatusChange}
            onTaskDrop={onStatusChange}
          />
        );
      })}
    </div>
  );
}

export default KanbanBoard;
