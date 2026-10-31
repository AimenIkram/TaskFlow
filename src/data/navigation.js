/**
 * Centralized Sidebar Navigation Configuration
 * Defines menu items, categories, and footer actions for data-driven rendering.
 */

import {
  LayoutDashboard,
  Calendar,
  Clock,
  Settings,
  HelpCircle
} from 'lucide-react';

/**
 * Main application navigation links
 */
export const MAIN_NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    id: 'today',
    label: 'Today',
    icon: Calendar,
    badge: null
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    icon: Clock,
    badge: null
  }
];

/**
 * Task category filter groups
 */
export const CATEGORY_ITEMS = [
  {
    id: 'work',
    label: 'Work',
    color: 'var(--color-category-work)',
    badge: '8'
  },
  {
    id: 'personal',
    label: 'Personal',
    color: 'var(--color-category-personal)',
    badge: '5'
  },
  {
    id: 'projects',
    label: 'Projects',
    color: 'var(--color-category-projects)',
    badge: '3'
  }
];

/**
 * Secondary utility navigation items
 */
export const SECONDARY_NAV_ITEMS = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  },
  {
    id: 'help',
    label: 'Help & Feedback',
    icon: HelpCircle
  }
];
