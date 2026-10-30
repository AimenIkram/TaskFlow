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
 */
export const SAMPLE_TASKS = [
  // To Do
  {
    id: 'task-1',
    title: 'Design System Documentation',
    description: 'Document design tokens, color palette, and spacing scale for engineering alignment.',
    status: TASK_STATUS.TODO,
    priority: 'high',
    dueDate: 'Nov 02',
    category: 'Work'
  },
  {
    id: 'task-2',
    title: 'Conduct User Research Interviews',
    description: 'Prepare script and schedule 5 user sessions for task management workflow feedback.',
    status: TASK_STATUS.TODO,
    priority: 'medium',
    dueDate: 'Nov 04',
    category: 'Projects'
  },
  {
    id: 'task-3',
    title: 'Weekly Productivity Review',
    description: 'Review completed goals and organize prioritized backlog for next sprint.',
    status: TASK_STATUS.TODO,
    priority: 'low',
    dueDate: 'Nov 05',
    category: 'Personal'
  },

  // In Progress
  {
    id: 'task-4',
    title: 'Implement Kanban Board Layout',
    description: 'Build responsive 3-column task board using reusable React components and CSS Grid.',
    status: TASK_STATUS.IN_PROGRESS,
    priority: 'high',
    dueDate: 'Oct 31',
    category: 'Work'
  },
  {
    id: 'task-5',
    title: 'Refactor Dashboard Navigation',
    description: 'Ensure active state synchronization between sidebar categories and main views.',
    status: TASK_STATUS.IN_PROGRESS,
    priority: 'medium',
    dueDate: 'Nov 01',
    category: 'Projects'
  },

  // Completed
  {
    id: 'task-6',
    title: 'Setup Vite & Global Design Tokens',
    description: 'Initialize application shell, tokens.css, and typography scale.',
    status: TASK_STATUS.COMPLETED,
    priority: 'medium',
    dueDate: 'Oct 28',
    category: 'Work'
  },
  {
    id: 'task-7',
    title: 'Build Top Navigation Bar',
    description: 'Implement breadcrumb, search input, theme toggle placeholder, and user profile avatar.',
    status: TASK_STATUS.COMPLETED,
    priority: 'high',
    dueDate: 'Oct 29',
    category: 'Work'
  },
  {
    id: 'task-8',
    title: 'Create Dashboard Stat Cards',
    description: 'Render responsive overview metrics for Total, To Do, In Progress, and Completed tasks.',
    status: TASK_STATUS.COMPLETED,
    priority: 'low',
    dueDate: 'Oct 30',
    category: 'Personal'
  }
];
