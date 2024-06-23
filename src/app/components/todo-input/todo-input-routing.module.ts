import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoInputComponent } from './todo-input.component';

const routes: Routes = [{ path: '', component: TodoInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoInputRoutingModule { }
