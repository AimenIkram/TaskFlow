/**
 * AddTaskModal Component
 * Reusable modal dialog for creating and editing tasks with controlled inputs.
 */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Generates a stable, unique task identifier.
 * Uses browser-native crypto.randomUUID() if supported, with a reliable
 * timestamp + random alphanumeric fallback for older/restricted environments.
 */
const generateTaskId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
  taskToEdit = null,
  onUpdateTask
}) {
  const isEditMode = Boolean(taskToEdit);

  // Controlled form state initialized from taskToEdit (if editing) or empty (if creating)
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');

  // Handle closing with the Escape key & locking background scroll while mounted
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Close when clicking directly on the semi-transparent backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Form submission handler supporting both create and edit modes
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    if (isEditMode) {
      // Preserve existing ID, status, priority, category, due date, etc.
      const updatedTask = {
        ...taskToEdit,
        title: trimmedTitle,
        description: description.trim()
      };

      if (onUpdateTask) {
        onUpdateTask(updatedTask);
      }
    } else {
      // Format current date for due date
      const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      // Construct new task object adhering to existing task schema
      const newTask = {
        id: generateTaskId(),
        title: trimmedTitle,
        description: description.trim(),
        status: 'todo', // Default to To Do column
        priority: 'medium', // Sensible default priority
        dueDate: formattedDate,
        category: 'Work' // Sensible default category
      };

      if (onAddTask) {
        onAddTask(newTask);
      }
    }

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container">
        {/* Modal Header */}
        <header className="modal-header">
          <div className="modal-header-info">
            <h2 id="modal-title" className="modal-title">
              {isEditMode ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-subtitle">
              {isEditMode
                ? 'Update the details for this task.'
                : 'Add the key details to organize your workflow.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        {/* Modal Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title <span className="form-required" aria-hidden="true">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="e.g., Design System Documentation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label htmlFor="task-desc" className="form-label">
              Description
            </label>
            <textarea
              id="task-desc"
              className="form-textarea"
              rows={4}
              placeholder="Provide context, acceptance criteria, or notes about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Modal Actions Footer */}
          <footer className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!title.trim()}
              title={!title.trim() ? 'Please enter a task title' : (isEditMode ? 'Save Changes' : 'Create Task')}
            >
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
