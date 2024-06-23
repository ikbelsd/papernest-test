import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

/**
 * Action to add a new task.
 * The task object is provided as a payload.
 * 
 * @param task - The task object to be added.
 */
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

/**
 * Action to edit an existing task.
 * The updated task object is provided as a payload.
 * 
 * @param task - The updated task object.
 */
export const editTask = createAction('[Task] Edit Task', props<{ task: Task }>());

/**
 * Action to delete a task.
 * The ID of the task to be deleted is provided as a payload.
 * 
 * @param id - The ID of the task to be deleted.
 */
export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());

/**
 * Action to toggle the completion status of a task.
 * The ID of the task to be toggled is provided as a payload.
 * 
 * @param id - The ID of the task to be toggled.
 */
export const toggleTask = createAction('[Task] Toggle Task', props<{ id: number }>());

/**
 * Action to load all tasks.
 * This action is typically dispatched to initiate the task loading process.
 */
export const loadTasks = createAction('[Task] Load Tasks');

/**
 * Action indicating that tasks have been loaded successfully.
 * The array of tasks that have been loaded is provided as a payload.
 * 
 * @param tasks - The array of tasks that have been loaded.
 */
export const tasksLoaded = createAction('[Task] Tasks Loaded', props<{ tasks: Task[] }>());

/**
 * Action to reorder tasks.
 * The reordered array of tasks is provided as a payload.
 * 
 * @param tasks - The reordered array of tasks.
 */
export const reorderTasks = createAction('[Task] Reorder Tasks', props<{ tasks: Task[] }>());

/**
 * Action to check for expired tasks.
 * This action is dispatched periodically to ensure expired tasks are handled.
 */
export const checkExpiredTasks = createAction('[Task] Check Expired Tasks');
