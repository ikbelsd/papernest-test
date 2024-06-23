import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoSearchComponent } from './todo-search.component';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [TodoSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [TodoSearchComponent]
})
export class TodoSearchModule { }
