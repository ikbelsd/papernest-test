import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoInputModule } from '../todo-input/todo-input.module';
import { TodoItemModule } from '../todo-item/todo-item.module';
import { TodoSearchModule } from '../todo-search/todo-search.module';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    FormsModule,
    CommonModule,
    DragDropModule,
    ScrollingModule,
    TodoInputModule,
    TodoItemModule,
    TodoSearchModule,
    RouterModule.forChild([{ path: '', component: TodoListComponent }]),
    MaterialModule
  ]
})
export class TodoListModule { }
