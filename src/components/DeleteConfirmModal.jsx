/**
 * DeleteConfirmModal Component
 * Accessible confirmation dialog for deleting a task.
 * Displays the selected task's title and prevents accidental data loss.
 */

import { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

function DeleteConfirmModal({ isOpen, task, onClose, onConfirm }) {
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

  // Close when clicking directly on the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !task) {
    return null;
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div className="modal-container delete-modal-container">
        {/* Modal Header */}
        <header className="modal-header">
          <div className="modal-header-info">
            <div className="delete-modal-title-row">
              <span className="delete-modal-icon-badge" aria-hidden="true">
                <AlertTriangle size={18} strokeWidth={2.5} />
              </span>
              <h2 id="delete-modal-title" className="modal-title">
                Delete Task
              </h2>
            </div>
            <p className="modal-subtitle">Confirm task deletion</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close delete confirmation"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        {/* Modal Content */}
        <div className="modal-body delete-modal-body">
          <p id="delete-modal-desc" className="delete-modal-text">
            Are you sure you want to delete{' '}
            <strong className="delete-modal-target-title">
              &ldquo;{task.title}&rdquo;
            </strong>
            ?
          </p>
          <p className="delete-modal-warning">
            This action cannot be undone. The task will be permanently removed from your board.
          </p>
        </div>

        {/* Modal Footer with Cancel and Delete Actions */}
        <footer className="modal-footer delete-modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            autoFocus
          >
            Delete Task
          </button>
        </footer>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
