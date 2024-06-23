import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoSearchComponent } from './todo-search.component';

const routes: Routes = [{ path: '', component: TodoSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoSearchRoutingModule { }
