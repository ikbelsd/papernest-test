import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  // Input property to receive the task data
  @Input()
  task!: Task;

  // Output event emitters for editing, deleting, and toggling tasks
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();

  // Method to handle editing the task
  onEditTask() {
    if (!this.task.completed) {
      this.editTask.emit(this.task);
    }
  }

  // Method to handle deleting the task
  onDeleteTask() {
    this.deleteTask.emit(this.task.id);
  }

  // Method to handle toggling the task completion status
  onToggleTask() {
    this.toggleTask.emit(this.task.id);
  }
}
