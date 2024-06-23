import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { loadTasks, addTask, editTask, deleteTask, toggleTask, reorderTasks, checkExpiredTasks } from '../../store/task.actions';
import { selectAllTasks } from '../../store/task.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  tasks$ = this.store.select(selectAllTasks); // Observable for all tasks
  tasks: Task[] = []; // Array to hold all tasks
  filteredTasks: Task[] = []; // Array to hold filtered tasks based on search
  editMode: boolean = false; // Flag to toggle edit mode
  taskToEdit: Task | null = null; // Task currently being edited
  ttl: number = 0; // Default TTL value in milliseconds

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadTasks()); // Dispatch action to load tasks on init
    this.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks; // Assign tasks from store to local array
      this.filteredTasks = tasks; // Initialize filtered tasks with all tasks
    });
    this.checkExpiredTasksPeriodically(); // Start periodic check for expired tasks
  }

  /**
   * Adds a new task
   * @param title - Title of the task to be added
   */
  onAddTask(title: string) {
    const task: Task = {
      id: Date.now(), // Use timestamp as unique ID
      title,
      completed: false,
      createdAt: new Date(),
      ttl: this.ttl
    };
    this.store.dispatch(addTask({ task })); // Dispatch action to add task
    this.ttl = 0; // Reset TTL after adding task
  }

  /**
   * Sets the task to be edited and enters edit mode
   * @param task - Task to be edited
   */
  onEditTask(task: Task) {
    this.editMode = true;
    this.taskToEdit = { ...task }; // Create a copy of the task to be edited
    this.ttl = task.ttl || 0; // Set TTL for editing
  }

  /**
   * Updates the title of the task being edited
   * @param event - Input event from the title input field
   */
  onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.taskToEdit) {
      this.taskToEdit.title = inputElement.value; // Update title of the task being edited
    }
  }

  /**
   * Saves the edited task
   */
  saveTask() {
    if (this.taskToEdit) {
      this.store.dispatch(editTask({ task: this.taskToEdit })); // Dispatch action to edit task
      this.editMode = false; // Exit edit mode
      this.taskToEdit = null; // Clear the task being edited
    }
  }

  /**
   * Deletes a task
   * @param id - ID of the task to be deleted
   */
  onDeleteTask(id: number) {
    this.store.dispatch(deleteTask({ id })); // Dispatch action to delete task
  }

  /**
   * Toggles the completion status of a task
   * @param id - ID of the task to be toggled
   */
  onToggleTask(id: number) {
    this.store.dispatch(toggleTask({ id })); // Dispatch action to toggle task
  }

  /**
   * Filters tasks based on a search term
   * @param searchTerm - Term to filter tasks by
   */
  onSearchTask(searchTerm: string) {
    this.filteredTasks = this.tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase())); // Filter tasks based on search term
  }

  /**
   * Handles drag and drop event to reorder tasks
   * @param event - Drag drop event
   */
  drop(event: CdkDragDrop<Task[]>) {
    const updatedTasks = [...this.filteredTasks];
    moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex); // Move item in array based on drag drop
    this.store.dispatch(reorderTasks({ tasks: updatedTasks })); // Dispatch action to reorder tasks
  }

  /**
   * Periodically checks for expired tasks
   */
  checkExpiredTasksPeriodically() {
    setInterval(() => {
      this.store.dispatch(checkExpiredTasks()); // Dispatch action to check for expired tasks
    }, 60000); // Check every minute
  }
}
