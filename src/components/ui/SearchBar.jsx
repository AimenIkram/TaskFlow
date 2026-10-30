/**
 * Reusable SearchBar Component
 * Provides a styled search input with icon and keyboard shortcut hint.
 */

import { Search } from 'lucide-react';

function SearchBar({
  placeholder = 'Search tasks, projects...',
  value,
  onChange,
  onSubmit,
  className = ''
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form
      className={`search-bar ${className}`.trim()}
      onSubmit={handleSubmit}
      role="search"
    >
      <span className="search-icon-wrapper" aria-hidden="true">
        <Search size={16} strokeWidth={2} className="search-icon" />
      </span>

      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search"
      />

      <span className="search-shortcut" aria-hidden="true">
        <kbd className="search-kbd">⌘K</kbd>
      </span>
    </form>
  );
}

export default SearchBar;
