/**
 * KanbanBoard Component
 * Renders the 3-column Kanban board by mapping over KANBAN_COLUMNS and SAMPLE_TASKS.
 */

import KanbanColumn from './KanbanColumn';
import { KANBAN_COLUMNS, SAMPLE_TASKS } from '../data/tasks';

function KanbanBoard({ tasks = SAMPLE_TASKS }) {
  return (
    <div className="kanban-board" role="region" aria-label="Task Management Kanban Board">
      {KANBAN_COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
          />
        );
      })}
    </div>
  );
}

export default KanbanBoard;
