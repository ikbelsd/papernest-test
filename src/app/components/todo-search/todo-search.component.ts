import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent implements OnInit {
  // Form control for search input
  searchControl = new FormControl();

  // Event emitter to output search term
  @Output() searchTask = new EventEmitter<string>();

  ngOnInit() {
    // Subscribe to value changes of searchControl with a debounce time of 300ms
    this.searchControl.valueChanges.pipe(
      debounceTime(300) // Wait for the user to stop typing for 300ms
    ).subscribe((value: any) => {
      this.searchTask.emit(value); // Emit the search term
    });
  }
}
