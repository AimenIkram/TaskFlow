/**
 * TaskFlow Top Navigation Bar (Navbar)
 * Displays the current view breadcrumb, search bar, and action controls.
 */

import { Sun, Bell, ChevronRight } from 'lucide-react';
import SearchBar from './ui/SearchBar';

function Navbar({
  pageTitle = 'Dashboard',
  parentTitle = 'Workspace',
  onNavigate,
  searchQuery = '',
  onSearchChange
}) {
  return (
    <header className="navbar" aria-label="Top Navigation">
      {/* Left Area: Breadcrumbs & View Title */}
      <div className="navbar-left">
        <nav className="navbar-breadcrumb" aria-label="Breadcrumb">
          <button
            type="button"
            className="breadcrumb-item-btn"
            onClick={() => onNavigate && onNavigate('dashboard')}
            title="Go to Dashboard"
          >
            {parentTitle}
          </button>
          <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />
          <h1 className="breadcrumb-current">{pageTitle}</h1>
        </nav>
      </div>

      {/* Center Area: Search Bar */}
      <div className="navbar-center">
        <SearchBar
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search tasks by title..."
        />
      </div>

      {/* Right Area: Action Controls & User Profile */}
      <div className="navbar-actions">
        {/* Theme Toggle Button (Visual only) */}
        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="Toggle visual theme"
          title="Toggle theme (Light / Dark)"
        >
          <Sun size={18} strokeWidth={2} />
        </button>

        {/* Notifications Button with Status Dot */}
        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} strokeWidth={2} />
          <span className="notification-indicator" aria-label="Unread notifications indicator" />
        </button>

        {/* Subtle Divider */}
        <span className="navbar-divider" aria-hidden="true" />

        {/* Profile Area */}
        <div className="navbar-profile" title="Alex Morgan (alex@taskflow.dev)">
          <div className="navbar-avatar" aria-hidden="true">
            AM
          </div>
          <div className="navbar-profile-meta">
            <span className="navbar-profile-name">Alex Morgan</span>
            <span className="navbar-profile-role">Productivity Pro</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
