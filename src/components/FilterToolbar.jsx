/**
 * FilterToolbar Component
 * Provides comprehensive search and multi-dimensional filtering for TaskFlow.
 * Supports title search, status, priority, dynamic category, and due date filters.
 */

import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { TASK_STATUS, TASK_PRIORITY } from '../data/tasks';

function FilterToolbar({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  onStatusChange,
  priorityFilter = 'all',
  onPriorityChange,
  categoryFilter = 'all',
  onCategoryChange,
  categories = [],
  dueDateFilter = 'all',
  onDueDateChange,
  isFiltered = false,
  onClearFilters,
  totalCount = 0,
  filteredCount = 0
}) {
  return (
    <section className="filter-toolbar" aria-label="Task Search and Filter Controls">
      <div className="filter-toolbar-row">
        {/* Left Side: Search Bar + Filter Dropdowns */}
        <div className="filter-controls-group">
          {/* Search Input Box */}
          <div className="filter-search-box">
            <span className="filter-search-icon-wrapper" aria-hidden="true">
              <Search size={15} className="filter-search-icon" />
            </span>
            <input
              type="text"
              className="filter-search-input"
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search tasks by title"
            />
            {searchQuery && (
              <button
                type="button"
                className="filter-search-clear-btn"
                onClick={() => onSearchChange('')}
                title="Clear search"
                aria-label="Clear search input"
              >
                <X size={14} strokeWidth={2} />
              </button>
            )}
          </div>

          <div className="filter-divider" aria-hidden="true" />

          {/* Filter Dropdowns Stack */}
          <div className="filter-dropdowns-group">
            {/* Status Filter */}
            <div className="filter-select-wrapper">
              <select
                className={`filter-select ${statusFilter !== 'all' ? 'filter-select--active' : ''}`}
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                aria-label="Filter by status"
                title="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value={TASK_STATUS.TODO}>To Do</option>
                <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                <option value={TASK_STATUS.COMPLETED}>Completed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="filter-select-wrapper">
              <select
                className={`filter-select ${priorityFilter !== 'all' ? 'filter-select--active' : ''}`}
                value={priorityFilter}
                onChange={(e) => onPriorityChange(e.target.value)}
                aria-label="Filter by priority"
                title="Filter by priority"
              >
                <option value="all">All Priorities</option>
                <option value={TASK_PRIORITY.LOW}>Low Priority</option>
                <option value={TASK_PRIORITY.MEDIUM}>Medium Priority</option>
                <option value={TASK_PRIORITY.HIGH}>High Priority</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="filter-select-wrapper">
              <select
                className={`filter-select ${categoryFilter !== 'all' ? 'filter-select--active' : ''}`}
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                aria-label="Filter by category"
                title="Filter by category"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date Filter */}
            <div className="filter-select-wrapper">
              <select
                className={`filter-select ${dueDateFilter !== 'all' ? 'filter-select--active' : ''}`}
                value={dueDateFilter}
                onChange={(e) => onDueDateChange(e.target.value)}
                aria-label="Filter by due date"
                title="Filter by due date"
              >
                <option value="all">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="no-due-date">No Due Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side: Results Summary & Clear Action */}
        <div className="filter-meta-group">
          <div className="filter-summary">
            <SlidersHorizontal size={13} className="filter-summary-icon" aria-hidden="true" />
            <span className="filter-count-text">
              {isFiltered ? (
                <>Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong></>
              ) : (
                <><strong>{totalCount}</strong> tasks</>
              )}
            </span>
          </div>

          {/* Clear Filters Button (rendered when any filter or search is active) */}
          {isFiltered && (
            <button
              type="button"
              className="btn-clear-filters"
              onClick={onClearFilters}
              title="Reset search and all active filters"
              aria-label="Clear all filters"
            >
              <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default FilterToolbar;
