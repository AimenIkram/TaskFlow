/**
 * TaskFlow Sidebar Component
 * Implements the brand header, main navigation, categories, and settings footer.
 */

import { useEffect, useMemo } from 'react';
import { CheckCheck, Settings2, X } from 'lucide-react';
import NavItem from './ui/NavItem';
import {
  MAIN_NAV_ITEMS,
  SECONDARY_NAV_ITEMS
} from '../data/navigation';
import { DEFAULT_CATEGORIES } from '../data/categories';
import { getLocalDateString } from '../data/tasks';
import { getInitials } from '../utils/storage';

function Sidebar({
  categories = DEFAULT_CATEGORIES,
  tasks = [],
  currentActiveId = 'dashboard',
  onNavigate,
  isOpen = false,
  onClose,
  userName = 'Workspace User',
  onEditProfile
}) {
  const activeId = currentActiveId;

  // Handle closing drawer with Escape key when open on mobile
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const todayStr = getLocalDateString();

  // Dynamically derive live badge counts for today, upcoming, and each category
  const { todayCount, upcomingCount, categoryCounts } = useMemo(() => {
    let today = 0;
    let upcoming = 0;
    const catCounts = {};

    categories.forEach((cat) => {
      catCounts[cat.id] = 0;
    });

    tasks.forEach((task) => {
      if (task.dueDate) {
        const trimmedDue = String(task.dueDate).trim();
        if (trimmedDue === todayStr) {
          today += 1;
        } else if (trimmedDue > todayStr) {
          upcoming += 1;
        }
      }

      categories.forEach((cat) => {
        if (
          task.categoryId === cat.id ||
          (task.category && cat.name && task.category.toLowerCase() === cat.name.toLowerCase())
        ) {
          catCounts[cat.id] = (catCounts[cat.id] || 0) + 1;
        }
      });
    });

    return {
      todayCount: today > 0 ? String(today) : null,
      upcomingCount: upcoming > 0 ? String(upcoming) : null,
      categoryCounts: catCounts
    };
  }, [tasks, categories, todayStr]);

  const handleItemClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`sidebar-backdrop${isOpen ? ' active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar${isOpen ? ' sidebar--open' : ''}`}
        aria-label="Sidebar Navigation"
      >
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <div className="brand-logo" aria-hidden="true">
              <CheckCheck size={18} strokeWidth={2.5} />
            </div>
            <div className="brand-info">
              <span className="brand-title">TaskFlow</span>
              <span className="brand-subtitle">Workspace</span>
            </div>
          </div>

          {/* Close button for mobile navigation drawer */}
          {onClose && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              aria-label="Close navigation menu"
              title="Close menu"
            >
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>

      {/* Main Scrollable Navigation Area */}
      <div className="sidebar-content">
        {/* Main Section */}
        <nav className="nav-section" aria-label="Main Navigation">
          <h2 className="nav-section-title">Main Menu</h2>
          <ul className="nav-list">
            {MAIN_NAV_ITEMS.map((item) => {
              let badge = item.badge;
              if (item.id === 'today') {
                badge = todayCount;
              } else if (item.id === 'upcoming') {
                badge = upcomingCount;
              }

              return (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  badge={badge}
                  isActive={activeId === item.id}
                  onClick={() => handleItemClick(item.id)}
                />
              );
            })}
          </ul>
        </nav>

        {/* Categories Section */}
        <section className="nav-section" aria-label="Categories">
          <div className="nav-section-header">
            <h2 className="nav-section-title">Categories</h2>
            <button
              type="button"
              className={`nav-section-action-btn ${activeId === 'categories' ? 'active' : ''}`}
              onClick={() => handleItemClick('categories')}
              title="Manage Categories"
              aria-label="Manage Categories"
            >
              <Settings2 size={13} aria-hidden="true" />
            </button>
          </div>
          <ul className="nav-list">
            {categories.map((category) => {
              const count = categoryCounts[category.id];
              const badge = count > 0 ? String(count) : null;

              return (
                <NavItem
                  key={category.id}
                  colorDot={category.color}
                  label={category.name || category.label}
                  badge={badge}
                  isActive={activeId === category.id}
                  onClick={() => handleItemClick(category.id)}
                />
              );
            })}
          </ul>
        </section>
      </div>

      {/* Sidebar Footer: Settings & Workspace Account */}
      <div className="sidebar-footer">
        <ul className="nav-list">
          {SECONDARY_NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeId === item.id}
              onClick={() => handleItemClick(item.id)}
            />
          ))}
        </ul>

        {/* User Workspace Profile Preview */}
        <button
          type="button"
          className="user-profile user-profile-btn"
          onClick={() => {
            if (onClose) onClose();
            if (onEditProfile) onEditProfile();
          }}
          title={`Profile: ${userName} (Click to edit)`}
          aria-label={`Profile: ${userName}. Click to edit name`}
        >
          <div className="user-avatar" aria-hidden="true">
            {getInitials(userName)}
          </div>
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-role">Personal Pro</span>
          </div>
        </button>
      </div>
    </aside>
  </>
);
}

export default Sidebar;
