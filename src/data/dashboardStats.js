/**
 * Centralized Dashboard Statistics Configuration
 * Sample metric data for Total Tasks, To Do, In Progress, and Completed.
 */

import {
  Layers,
  ListTodo,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const DASHBOARD_STATS = [
  {
    id: 'total-tasks',
    label: 'Total Tasks',
    value: 24,
    icon: Layers,
    variant: 'total',
    subtext: '+4 from last week'
  },
  {
    id: 'to-do',
    label: 'To Do',
    value: 9,
    icon: ListTodo,
    variant: 'todo',
    subtext: '3 high priority'
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    value: 7,
    icon: Clock,
    variant: 'progress',
    subtext: '2 due today'
  },
  {
    id: 'completed',
    label: 'Completed',
    value: 8,
    icon: CheckCircle2,
    variant: 'completed',
    subtext: '100% on schedule'
  }
];
