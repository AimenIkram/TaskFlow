/**
 * CategoryModal Component
 * Accessible dialog for creating a new category or editing an existing one.
 * Includes empty validation, case-insensitive duplicate checking, and color selection.
 */

import { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, Palette } from 'lucide-react';
import { CATEGORY_COLORS, generateCategoryId } from '../data/categories';

function CategoryModal({
  isOpen,
  categoryToEdit = null,
  existingCategories = [],
  onClose,
  onSave
}) {
  const isEditing = Boolean(categoryToEdit);

  // Initialize state directly from categoryToEdit (if editing) or empty defaults (if creating)
  const [name, setName] = useState(categoryToEdit?.name || '');
  const [color, setColor] = useState(categoryToEdit?.color || CATEGORY_COLORS[0].value);
  const [description, setDescription] = useState(categoryToEdit?.description || '');
  const [error, setError] = useState('');

  const nameInputRef = useRef(null);

  // Handle escape key navigation, background scroll locking, and auto-focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      nameInputRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();

    // 1. Validate non-empty
    if (!trimmedName) {
      setError('Category name is required.');
      nameInputRef.current?.focus();
      return;
    }

    // 2. Prevent duplicate names, case-insensitive (excluding self when editing)
    const normalizedName = trimmedName.toLowerCase();
    const isDuplicate = existingCategories.some((cat) => {
      if (isEditing && cat.id === categoryToEdit.id) {
        return false;
      }
      return cat.name.trim().toLowerCase() === normalizedName;
    });

    if (isDuplicate) {
      setError(`A category named "${trimmedName}" already exists.`);
      nameInputRef.current?.focus();
      return;
    }

    // 3. Construct category object preserving existing ID when editing
    const categoryData = {
      id: isEditing ? categoryToEdit.id : generateCategoryId(),
      name: trimmedName,
      color,
      description: description.trim()
    };

    onSave(categoryData);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-container modal-container--sm"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 id="category-modal-title" className="modal-title">
              {isEditing ? 'Edit Category' : 'Create Category'}
            </h2>
            <p className="modal-subtitle">
              {isEditing
                ? 'Update category name, badge color, and description.'
                : 'Add a new category to group and organize your tasks.'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {error && (
            <div className="form-error-banner" role="alert">
              <AlertCircle size={16} strokeWidth={2} className="form-error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* Category Name */}
          <div className="form-group">
            <label htmlFor="category-name" className="form-label">
              Category Name <span className="form-required">*</span>
            </label>
            <input
              id="category-name"
              ref={nameInputRef}
              type="text"
              className={`form-input ${error ? 'input-error' : ''}`}
              placeholder="e.g., Marketing, Finance, Research"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              maxLength={40}
              required
            />
          </div>

          {/* Color Selection Palette */}
          <div className="form-group">
            <label className="form-label">
              <Palette size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Theme Color
            </label>
            <div className="category-color-picker" role="radiogroup" aria-label="Category color">
              {CATEGORY_COLORS.map((col) => {
                const isSelected = color === col.value;
                return (
                  <button
                    key={col.id}
                    type="button"
                    className={`color-swatch-btn ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: col.value }}
                    onClick={() => setColor(col.value)}
                    role="radio"
                    aria-checked={isSelected}
                    title={col.label}
                    aria-label={`Select ${col.label} color`}
                  >
                    {isSelected && (
                      <span className="color-swatch-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="category-desc" className="form-label">
              Description <span className="form-optional">(Optional)</span>
            </label>
            <textarea
              id="category-desc"
              className="form-textarea form-textarea--compact"
              placeholder="Brief summary of what tasks belong in this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              maxLength={150}
            />
          </div>

          {/* Actions Footer */}
          <div className="modal-actions">
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
              {isEditing ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
