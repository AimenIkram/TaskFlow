/**
 * EditProfileModal Component
 * Accessible modal allowing users to edit and update their workspace display name.
 */

import { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import { getInitials } from '../utils/storage';

function EditProfileModal({
  isOpen,
  currentName = '',
  onClose,
  onSave
}) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');

  // Handle closing with Escape key & background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError('Display name cannot be empty.');
      return;
    }

    onSave(trimmed);
    onClose();
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    if (error) {
      setError('');
    }
  };

  const previewInitials = getInitials(name || currentName || 'TF');

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <div className="modal-container edit-profile-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <h2 id="edit-profile-title" className="modal-title">
              Edit Profile
            </h2>
            <p className="modal-subtitle">
              Update your display name across your workspace.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close dialog"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {/* Live Avatar Preview */}
          <div className="profile-preview-card">
            <div className="profile-preview-avatar" aria-hidden="true">
              {previewInitials}
            </div>
            <div className="profile-preview-details">
              <span className="profile-preview-name">
                {name.trim() || 'Your Name'}
              </span>
              <span className="profile-preview-sub">Workspace Profile</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-display-name" className="form-label">
              <User size={14} className="form-label-icon" aria-hidden="true" />
              <span>Display Name</span>
              <span className="form-required-mark" aria-hidden="true">*</span>
            </label>
            <input
              id="edit-display-name"
              type="text"
              className={`form-input ${error ? 'form-input--error' : ''}`}
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={handleInputChange}
              autoFocus
              maxLength={40}
              aria-required="true"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'edit-name-error' : undefined}
            />
            {error && (
              <span id="edit-name-error" className="form-error-msg" role="alert">
                {error}
              </span>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="modal-footer">
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
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
