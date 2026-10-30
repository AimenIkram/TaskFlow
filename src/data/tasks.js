/**
 * Centralized Tasks & Kanban Configuration Data
 * Defines canonical workflow statuses, column metadata, and realistic sample tasks.
 */

import { CircleDot, Clock, CheckCircle2 } from 'lucide-react';

/**
 * Canonical task statuses
 * Defines the exactly three supported workflow states across TaskFlow.
 */
export const TASK_STATUS = Object.freeze({
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
});

/**
 * Supported task priorities
 * Exactly three values: Low, Medium, and High.
 */
export const TASK_PRIORITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
});

export const PRIORITY_OPTIONS = [
  { value: TASK_PRIORITY.LOW, label: 'Low' },
  { value: TASK_PRIORITY.MEDIUM, label: 'Medium' },
  { value: TASK_PRIORITY.HIGH, label: 'High' }
];

/**
 * Formats an ISO YYYY-MM-DD date string into a friendly, compact display (e.g. 'Nov 02').
 */
export const formatDueDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    }
  }
  return dateStr;
};

/**
 * Returns the current local calendar date formatted strictly as 'YYYY-MM-DD'.
 * Uses local year, month, and day to completely avoid UTC conversion and timezone shift bugs.
 */
export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Evaluates whether a task is overdue.
 *
 * Rules:
 * 1. Must have a valid due date.
 * 2. Due date must be strictly earlier than current local calendar date (YYYY-MM-DD).
 * 3. Completed tasks are NEVER marked overdue.
 * 4. Tasks without a valid due date are NEVER marked overdue.
 */
export const isTaskOverdue = (task, todayStr = getLocalDateString()) => {
  if (!task || !task.dueDate) return false;
  if (task.status === TASK_STATUS.COMPLETED) return false;

  const trimmedDate = String(task.dueDate).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) return false;

  return trimmedDate < todayStr;
};

/**
 * Kanban workflow columns
 * Each column is mapped strictly to one canonical task status.
 */
export const KANBAN_COLUMNS = [
  {
    id: TASK_STATUS.TODO,
    title: 'To Do',
    icon: CircleDot,
    color: 'var(--color-status-todo)',
    badgeColor: 'var(--color-status-todo-bg)',
    textColor: 'var(--color-status-todo)'
  },
  {
    id: TASK_STATUS.IN_PROGRESS,
    title: 'In Progress',
    icon: Clock,
    color: 'var(--color-status-progress)',
    badgeColor: 'var(--color-status-progress-bg)',
    textColor: 'var(--color-status-progress)'
  },
  {
    id: TASK_STATUS.COMPLETED,
    title: 'Completed',
    icon: CheckCircle2,
    color: 'var(--color-status-completed)',
    badgeColor: 'var(--color-status-completed-bg)',
    textColor: 'var(--color-status-completed)'
  }
];

/**
 * Sample task items displayed across columns
 * Connected to starter categories via stable categoryId, with ISO YYYY-MM-DD due dates.
 */
export const SAMPLE_TASKS = [
  // To Do
  {
    id: 'task-1',
    title: 'Design System Documentation',
    description: 'Document design tokens, color palette, and spacing scale for engineering alignment.',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.HIGH,
    dueDate: '2026-11-02',
    categoryId: 'cat-work',
    category: 'Work'
  },
  {
    id: 'task-2',
    title: 'Conduct User Research Interviews',
    description: 'Prepare script and schedule 5 user sessions for task management workflow feedback.',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '2026-10-26',
    categoryId: 'cat-study',
    category: 'Study'
  },
  {
    id: 'task-3',
    title: 'Weekly Productivity Review',
    description: 'Review completed goals and organize prioritized backlog for next sprint.',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.LOW,
    dueDate: '2026-11-05',
    categoryId: 'cat-personal',
    category: 'Personal'
  },

  // In Progress
  {
    id: 'task-4',
    title: 'Implement Kanban Board Layout',
    description: 'Build responsive 3-column task board using reusable React components and CSS Grid.',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.HIGH,
    dueDate: '2026-10-31',
    categoryId: 'cat-work',
    category: 'Work'
  },
  {
    id: 'task-5',
    title: 'Refactor Dashboard Navigation',
    description: 'Ensure active state synchronization between sidebar categories and main views.',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '2026-11-01',
    categoryId: 'cat-study',
    category: 'Study'
  },

  // Completed
  {
    id: 'task-6',
    title: 'Setup Vite & Global Design Tokens',
    description: 'Initialize application shell, tokens.css, and typography scale.',
    status: TASK_STATUS.COMPLETED,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '2026-10-28',
    categoryId: 'cat-work',
    category: 'Work'
  },
  {
    id: 'task-7',
    title: 'Build Top Navigation Bar',
    description: 'Implement breadcrumb, search input, theme toggle placeholder, and user profile avatar.',
    status: TASK_STATUS.COMPLETED,
    priority: TASK_PRIORITY.HIGH,
    dueDate: '2026-10-29',
    categoryId: 'cat-work',
    category: 'Work'
  },
  {
    id: 'task-8',
    title: 'Create Dashboard Stat Cards',
    description: 'Render responsive overview metrics for Total, To Do, In Progress, and Completed tasks.',
    status: TASK_STATUS.COMPLETED,
    priority: TASK_PRIORITY.LOW,
    dueDate: '2026-10-30',
    categoryId: 'cat-health',
    category: 'Health'
  }
];
