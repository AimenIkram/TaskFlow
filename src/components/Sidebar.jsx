/**
 * TaskFlow Sidebar Component
 * Implements the brand header, main navigation, categories, and settings footer.
 */

import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import NavItem from './ui/NavItem';
import {
  MAIN_NAV_ITEMS,
  CATEGORY_ITEMS,
  SECONDARY_NAV_ITEMS
} from '../data/navigation';

function Sidebar({ currentActiveId, onNavigate }) {
  // Local state for active item tracking (defaults to 'dashboard')
  const [activeId, setActiveId] = useState(currentActiveId || 'dashboard');

  const handleItemClick = (id) => {
    setActiveId(id);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
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
      </div>

      {/* Main Scrollable Navigation Area */}
      <div className="sidebar-content">
        {/* Main Section */}
        <nav className="nav-section" aria-label="Main Navigation">
          <h2 className="nav-section-title">Main Menu</h2>
          <ul className="nav-list">
            {MAIN_NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isActive={activeId === item.id}
                onClick={() => handleItemClick(item.id)}
              />
            ))}
          </ul>
        </nav>

        {/* Categories Section */}
        <section className="nav-section" aria-label="Categories">
          <h2 className="nav-section-title">Categories</h2>
          <ul className="nav-list">
            {CATEGORY_ITEMS.map((category) => (
              <NavItem
                key={category.id}
                colorDot={category.color}
                label={category.label}
                badge={category.badge}
                isActive={activeId === category.id}
                onClick={() => handleItemClick(category.id)}
              />
            ))}
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
        <div className="user-profile">
          <div className="user-avatar" aria-hidden="true">
            TF
          </div>
          <div className="user-details">
            <span className="user-name">TaskFlow Workspace</span>
            <span className="user-role">Personal Pro</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
