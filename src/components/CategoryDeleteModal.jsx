/**
 * CategoryDeleteModal Component
 * Accessible confirmation dialog for deleting a category.
 * Displays the category name and its color indicator, preventing accidental deletion.
 */

import { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

function CategoryDeleteModal({ isOpen, category, onClose, onConfirm }) {
  // Handle closing with Escape key & locking background scroll while open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !category) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="modal-container delete-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-category-modal-title"
        aria-describedby="delete-category-modal-desc"
      >
        {/* Modal Header */}
        <header className="modal-header">
          <div className="modal-header-info">
            <div className="delete-modal-title-row">
              <span className="delete-modal-icon-badge" aria-hidden="true">
                <AlertTriangle size={18} strokeWidth={2.5} />
              </span>
              <h2 id="delete-category-modal-title" className="modal-title">
                Delete Category
              </h2>
            </div>
            <p className="modal-subtitle">Confirm category deletion</p>
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
          <p id="delete-category-modal-desc" className="delete-modal-text">
            Are you sure you want to delete the category{' '}
            <span
              className="category-pill-preview"
              style={{
                backgroundColor: `${category.color}18`,
                color: category.color,
                borderColor: `${category.color}35`
              }}
            >
              <span
                className="category-dot"
                style={{ backgroundColor: category.color }}
                aria-hidden="true"
              />
              <strong>{category.name}</strong>
            </span>
            ?
          </p>
          <p className="delete-modal-warning">
            This action cannot be undone. Any tasks currently associated with this category can be reassigned later.
          </p>
        </div>

        {/* Modal Actions */}
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
            Delete Category
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CategoryDeleteModal;
