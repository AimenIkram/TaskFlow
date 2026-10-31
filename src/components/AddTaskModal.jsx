/**
 * AddTaskModal Component
 * Reusable modal dialog for creating and editing tasks with controlled inputs.
 */

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TASK_STATUS, TASK_PRIORITY, PRIORITY_OPTIONS } from '../data/tasks';

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
  categories = [],
  onClose,
  onAddTask,
  taskToEdit = null,
  onUpdateTask
}) {
  const isEditMode = Boolean(taskToEdit);

  // Derive initial category ID: prefer taskToEdit.categoryId, fallback to matching name, or first category
  const initialCategoryId = (() => {
    if (taskToEdit?.categoryId) return taskToEdit.categoryId;
    if (taskToEdit?.category) {
      const match = categories.find(
        (c) => c.name.toLowerCase() === taskToEdit.category.toLowerCase()
      );
      if (match) return match.id;
    }
    return categories[0]?.id || '';
  })();

  // Derive initial due date in YYYY-MM-DD format if valid
  const initialDueDate = (() => {
    if (taskToEdit?.dueDate && /^\d{4}-\d{2}-\d{2}$/.test(taskToEdit.dueDate)) {
      return taskToEdit.dueDate;
    }
    return '';
  })();

  // Controlled form state initialized from taskToEdit (if editing) or defaults
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [priority, setPriority] = useState(taskToEdit?.priority || TASK_PRIORITY.MEDIUM);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [titleError, setTitleError] = useState('');

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
      setTitleError('Task title is required.');
      return;
    }

    const matchedCategory = categories.find((c) => c.id === categoryId);

    if (isEditMode) {
      // Preserve existing ID and status, update title, description, category, priority, due date
      const updatedTask = {
        ...taskToEdit,
        title: trimmedTitle,
        description: description.trim(),
        categoryId: categoryId || null,
        category: matchedCategory?.name || null,
        priority: priority || TASK_PRIORITY.MEDIUM,
        dueDate: dueDate || null
      };

      if (onUpdateTask) {
        onUpdateTask(updatedTask);
      }
    } else {
      // Construct new task object adhering to updated task schema
      const newTask = {
        id: generateTaskId(),
        title: trimmedTitle,
        description: description.trim(),
        status: TASK_STATUS.TODO, // Default to To Do column
        categoryId: categoryId || null,
        category: matchedCategory?.name || null,
        priority: priority || TASK_PRIORITY.MEDIUM,
        dueDate: dueDate || null
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
              className={`form-input${titleError ? ' form-input--error' : ''}`}
              placeholder="e.g., Design System Documentation"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? 'task-title-error' : undefined}
              autoFocus
              required
            />
            {titleError && (
              <span id="task-title-error" className="form-error-msg" role="alert">
                {titleError}
              </span>
            )}
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label htmlFor="task-desc" className="form-label">
              Description
            </label>
            <textarea
              id="task-desc"
              className="form-textarea"
              rows={3}
              placeholder="Provide context, acceptance criteria, or notes about this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Category, Priority, and Due Date 3-column Grid */}
          <div className="form-row-grid">
            {/* Category Field */}
            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Field */}
            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority
              </label>
              <select
                id="task-priority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date Field */}
            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">
                Due Date
              </label>
              <input
                id="task-due-date"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
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
