/**
 * Reusable KanbanColumn Component
 * Represents a single workflow stage containing a list of TaskCards.
 */

import { useState, useRef } from 'react';
import { Inbox } from 'lucide-react';
import TaskCard from './ui/TaskCard';

function KanbanColumn({
  column,
  tasks = [],
  categories = [],
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onStatusChange,
  onTaskDrop
}) {
  const { title, icon: Icon, color } = column;
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDropAction = onTaskDrop || onStatusChange;

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounterRef.current += 1;
    if (dragCounterRef.current > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    dragCounterRef.current = 0;
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId && handleDropAction) {
      handleDropAction(taskId, column.id);
    }
  };

  return (
    <section
      className={`kanban-column${isDragOver ? ' kanban-column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`${title} Column (${tasks.length} tasks)`}
    >
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
              categories={categories}
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
