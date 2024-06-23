import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskService } from '../services/task.service';
import { loadTasks, tasksLoaded, addTask, editTask, deleteTask, toggleTask, reorderTasks, checkExpiredTasks } from './task.actions';
import { selectAllTasks } from './task.selectors';

@Injectable()
export class TaskEffects {

  /**
   * Effect to load tasks.
   * This effect listens for the `loadTasks` action, retrieves the tasks from the TaskService,
   * and then dispatches the `tasksLoaded` action with the retrieved tasks.
   */
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() => {
        const tasks = this.taskService.getTasks();
        return [tasksLoaded({ tasks })];
      })
    )
  );

  /**
   * Effect to save tasks.
   * This effect listens for actions that modify the tasks (add, edit, delete, toggle, reorder),
   * retrieves the updated list of tasks from the store, and saves the tasks using the TaskService.
   * Note: This effect does not dispatch any actions.
   */
  saveTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask, editTask, deleteTask, toggleTask, reorderTasks),
      withLatestFrom(this.store.select(selectAllTasks)),
      tap(([action, tasks]) => {
        this.taskService.saveTasks(tasks);
      })
    ),
    { dispatch: false }
  );

  /**
   * Effect to check and filter expired tasks.
   * This effect listens for the `checkExpiredTasks` action, retrieves the list of tasks from the store,
   * filters out expired tasks based on their TTL (time-to-live), and dispatches the `tasksLoaded` action
   * with the valid (non-expired) tasks.
   */
  checkExpiredTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkExpiredTasks),
      withLatestFrom(this.store.select(selectAllTasks)),
      map(([action, tasks]) => {
        const now = new Date().getTime();
        const validTasks = tasks.filter(task => !task.ttl || new Date(task.createdAt).getTime() + task.ttl > now);
        return tasksLoaded({ tasks: validTasks });
      })
    )
  );

  /**
   * Constructor for TaskEffects.
   * 
   * @param actions$ - Stream of actions observed by the effects.
   * @param taskService - Service for managing tasks.
   * @param store - NgRx store for selecting the state.
   */
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) { }
}
