/**
 * Centralized Dashboard Statistics Configuration
 * Computes dynamic metrics for Total Tasks, To Do, In Progress, and Completed stages.
 */

import {
  Layers,
  ListTodo,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { TASK_STATUS } from './tasks';

/**
 * Calculates dynamic dashboard statistics from the live tasks array.
 * @param {Array} tasks - Current tasks from React state
 * @returns {Array} Array of formatted stat card configurations
 */
export const calculateDashboardStats = (tasks = []) => {
  const totalCount = tasks.length;
  const todoCount = tasks.filter((t) => t.status === TASK_STATUS.TODO).length;
  const inProgressCount = tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length;
  const completedCount = tasks.filter((t) => t.status === TASK_STATUS.COMPLETED).length;

  return [
    {
      id: 'total-tasks',
      label: 'Total Tasks',
      value: totalCount,
      icon: Layers,
      variant: 'total',
      subtext: totalCount === 1 ? '1 active task' : `${totalCount} active tasks`
    },
    {
      id: 'to-do',
      label: 'To Do',
      value: todoCount,
      icon: ListTodo,
      variant: 'todo',
      subtext: `${todoCount} waiting to start`
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: inProgressCount,
      icon: Clock,
      variant: 'progress',
      subtext: `${inProgressCount} currently active`
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completedCount,
      icon: CheckCircle2,
      variant: 'completed',
      subtext:
        totalCount > 0
          ? `${Math.round((completedCount / totalCount) * 100)}% resolved`
          : '0% resolved'
    }
  ];
};

/**
 * Fallback static statistics for initial rendering or standalone testing
 */
export const DASHBOARD_STATS = calculateDashboardStats([]);
