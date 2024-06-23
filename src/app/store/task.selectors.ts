import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../models/task.model';

/**
 * Selector to get the tasks state from the store.
 */
export const selectTasks = createFeatureSelector<Task[]>('tasks');

/**
 * Selector to get all tasks from the tasks state.
 *
 * @returns {Task[]} - Array of all tasks.
 */
export const selectAllTasks = createSelector(
  selectTasks,
  (tasks) => tasks
);

/**
 * Selector to get only the completed tasks from the tasks state.
 *
 * @returns {Task[]} - Array of completed tasks.
 */
export const selectCompletedTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter(task => task.completed)
);

/**
 * Selector to get only the pending tasks from the tasks state.
 *
 * @returns {Task[]} - Array of pending tasks.
 */
export const selectPendingTasks = createSelector(
  selectTasks,
  (tasks) => tasks.filter(task => !task.completed)
);
