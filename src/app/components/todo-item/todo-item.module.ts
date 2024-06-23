import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './todo-item.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [TodoItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [TodoItemComponent]
})
export class TodoItemModule { }
