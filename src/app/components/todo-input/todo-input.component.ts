import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent {
  // Title property bound to the input field
  title: string = '';

  // Output event emitter to notify parent component about the new task
  @Output() addTask = new EventEmitter<string>();

  /**
   * Method to handle adding a new task.
   * It emits the title of the task to the parent component and clears the input field.
   */
  onAddTask() {
    // Ensure the title is not empty or just whitespace
    if (this.title.trim()) {
      // Emit the title to the parent component
      this.addTask.emit(this.title);
      // Clear the input field
      this.title = '';
    }
  }
}
