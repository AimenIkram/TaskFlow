/**
 * CategoryManager Component
 * Central management view for TaskFlow categories.
 * Allows viewing, creating, editing, and deleting categories with stable IDs.
 */

import { Plus, Edit2, Trash2, Tag, Info, ArrowLeft } from 'lucide-react';

function CategoryManager({
  categories = [],
  onOpenCreateModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onBackToDashboard
}) {
  return (
    <div className="category-manager" role="region" aria-label="Category Management">
      {/* Top Header */}
      <header className="page-header">
        <div className="page-header-info">
          <div className="category-header-top-row">
            {onBackToDashboard && (
              <button
                type="button"
                className="btn-back-dashboard"
                onClick={onBackToDashboard}
                title="Return to Task Dashboard"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                <span>Dashboard</span>
              </button>
            )}
            <h1 className="page-header-title">Category Management</h1>
          </div>
          <p className="page-header-desc">
            Organize tasks by creating and customizing categories with stable unique identifiers.
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenCreateModal}
            aria-label="Create new category"
          >
            <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
            <span>New Category</span>
          </button>
        </div>
      </header>

      {/* Overview Info Banner */}
      <div className="category-info-banner">
        <div className="category-info-left">
          <Info size={16} className="category-info-icon" aria-hidden="true" />
          <span className="category-info-text">
            Categories have stable unique IDs so you can rename them anytime without breaking task associations.
          </span>
        </div>
        <div className="category-count-badge">
          <span>Total: <strong>{categories.length}</strong></span>
        </div>
      </div>

      {/* Categories Grid or Empty State */}
      {categories.length === 0 ? (
        <div className="category-empty-state" role="status">
          <div className="category-empty-icon-box" aria-hidden="true">
            <Tag size={32} strokeWidth={1.75} />
          </div>
          <div className="category-empty-text">
            <h3 className="category-empty-title">No categories found</h3>
            <p className="category-empty-desc">
              You do not have any active categories. Create a category to start organizing your workflow.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenCreateModal}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create First Category</span>
          </button>
        </div>
      ) : (
        <div className="category-grid" role="list" aria-label="Categories list">
          {categories.map((category) => (
            <article
              key={category.id}
              className="category-card"
              role="listitem"
            >
              {/* Card Top: Indicator Badge & Action Controls */}
              <div className="category-card-top">
                <div
                  className="category-tag-badge"
                  style={{
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                    borderColor: `${category.color}35`
                  }}
                >
                  <span
                    className="category-dot"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                  />
                  <span className="category-tag-name">{category.name}</span>
                </div>

                <div className="category-card-actions">
                  <button
                    type="button"
                    className="category-action-btn"
                    onClick={() => onOpenEditModal(category)}
                    title={`Edit ${category.name}`}
                    aria-label={`Edit ${category.name} category`}
                  >
                    <Edit2 size={15} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    className="category-action-btn category-action-btn--delete"
                    onClick={() => onOpenDeleteModal(category)}
                    title={`Delete ${category.name}`}
                    aria-label={`Delete ${category.name} category`}
                  >
                    <Trash2 size={15} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Card Body: Description */}
              <div className="category-card-body">
                <p className="category-card-desc">
                  {category.description || (
                    <span className="category-card-desc-empty">No description provided</span>
                  )}
                </p>
              </div>

              {/* Card Footer: Stable ID Metadata */}
              <div className="category-card-footer">
                <span className="category-id-chip" title="Stable Category ID for referencing">
                  ID: <code>{category.id}</code>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryManager;
