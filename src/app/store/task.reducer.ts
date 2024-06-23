import { Action, createReducer, on } from '@ngrx/store';
import { Task } from '../models/task.model';
import { addTask, editTask, deleteTask, toggleTask, tasksLoaded, reorderTasks, checkExpiredTasks } from './task.actions';

// Initial state of the tasks, which is an empty array.
export const initialState: Task[] = [];

// Internal reducer function to handle task actions.
const _taskReducer = createReducer(
  initialState,
  // Handle the addTask action, which adds a new task to the state.
  on(addTask, (state: any, { task }: any) => [...state, task]),

  // Handle the editTask action, which updates an existing task in the state.
  on(editTask, (state: any[], { task }: any) => state.map(t => t.id === task.id ? task : t)),

  // Handle the deleteTask action, which removes a task from the state by its id.
  on(deleteTask, (state: any[], { id }: any) => state.filter(t => t.id !== id)),

  // Handle the toggleTask action, which toggles the completed status of a task.
  on(toggleTask, (state: any[], { id }: any) => state.map(t => t.id === id ? { ...t, completed: !t.completed } : t)),

  // Handle the tasksLoaded action, which replaces the state with the loaded tasks.
  on(tasksLoaded, (state: any, { tasks }: any) => tasks),

  // Handle the reorderTasks action, which reorders the tasks in the state.
  on(reorderTasks, (state: any, { tasks }: any) => tasks),

  // Handle the checkExpiredTasks action, which filters out expired tasks based on TTL.
  on(checkExpiredTasks, (state: any[]) => state.filter(task => !task.ttl || new Date(task.createdAt).getTime() + task.ttl > new Date().getTime()))
);

/**
 * Exported reducer function that handles task actions.
 * This function wraps the internal _taskReducer function and provides the current state and action.
 *
 * @param state - Current state of the tasks.
 * @param action - Action to be handled by the reducer.
 * @returns New state after applying the action.
 */
export function taskReducer(state: Task[] | undefined, action: Action<string>) {
  return _taskReducer(state, action);
}
