import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoInputComponent } from './todo-input.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [TodoInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [TodoInputComponent]
})
export class TodoInputModule { }
