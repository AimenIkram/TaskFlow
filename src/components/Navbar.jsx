/**
 * TaskFlow Top Navigation Bar (Navbar)
 * Displays the current view breadcrumb, search bar, and action controls.
 */

import { Sun, Moon, Bell, ChevronRight, Menu } from 'lucide-react';
import SearchBar from './ui/SearchBar';
import { getInitials } from '../utils/storage';

function Navbar({
  pageTitle = 'Dashboard',
  parentTitle = 'Workspace',
  onNavigate,
  searchQuery = '',
  onSearchChange,
  theme = 'light',
  onToggleTheme,
  isMobileNavOpen = false,
  onToggleMobileMenu,
  userName = 'User',
  onEditProfile
}) {
  return (
    <header className="navbar" aria-label="Top Navigation">
      {/* Left Area: Mobile Menu Toggle, Breadcrumbs & View Title */}
      <div className="navbar-left">
        {onToggleMobileMenu && (
          <button
            type="button"
            className="navbar-icon-btn navbar-menu-btn"
            onClick={onToggleMobileMenu}
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileNavOpen}
            title="Navigation Menu"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        )}

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
        {/* Interactive Theme Toggle Button */}
        <button
          type="button"
          className="navbar-icon-btn navbar-theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? (
            <Sun size={18} strokeWidth={2} className="theme-toggle-icon" />
          ) : (
            <Moon size={18} strokeWidth={2} className="theme-toggle-icon" />
          )}
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
        <button
          type="button"
          className="navbar-profile navbar-profile-btn"
          onClick={onEditProfile}
          title={`Profile: ${userName} (Click to edit)`}
          aria-label={`Profile: ${userName}. Click to edit name`}
        >
          <div className="navbar-avatar" aria-hidden="true">
            {getInitials(userName)}
          </div>
          <div className="navbar-profile-meta">
            <span className="navbar-profile-name">{userName}</span>
            <span className="navbar-profile-role">Productivity Pro</span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
