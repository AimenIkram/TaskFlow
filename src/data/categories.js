/**
 * Category Definitions & Starter Data for TaskFlow
 * Provides canonical starter categories with stable unique IDs, curated color palettes,
 * and reliable ID generation helpers.
 */

/**
 * Curated color palette for category indicators
 */
export const CATEGORY_COLORS = [
  { id: 'blue', label: 'Blue', value: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  { id: 'emerald', label: 'Emerald', value: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  { id: 'purple', label: 'Purple', value: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
  { id: 'pink', label: 'Pink', value: '#ec4899', bg: '#fdf2f8', border: '#fbcfe8' },
  { id: 'amber', label: 'Amber', value: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  { id: 'cyan', label: 'Cyan', value: '#06b6d4', bg: '#ecfeff', border: '#a5f3fc' },
  { id: 'indigo', label: 'Indigo', value: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' },
  { id: 'rose', label: 'Rose', value: '#f43f5e', bg: '#fff1f2', border: '#fecdd3' }
];

/**
 * Predefined starter categories required for Phase 7
 * Each category possesses a stable, unique ID for future task referencing.
 */
export const DEFAULT_CATEGORIES = [
  {
    id: 'cat-work',
    name: 'Work',
    color: '#3b82f6',
    description: 'Professional projects, deliverables, and team assignments'
  },
  {
    id: 'cat-personal',
    name: 'Personal',
    color: '#10b981',
    description: 'Personal errands, habits, finances, and home tasks'
  },
  {
    id: 'cat-study',
    name: 'Study',
    color: '#8b5cf6',
    description: 'Courses, reading, research, and skill development'
  },
  {
    id: 'cat-health',
    name: 'Health',
    color: '#ec4899',
    description: 'Workouts, medical checkups, wellness, and nutrition'
  }
];

/**
 * Generates a stable unique category ID.
 * Prefers crypto.randomUUID() when available in modern browser environments,
 * with a resilient high-entropy fallback for legacy runtimes.
 */
export const generateCategoryId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
