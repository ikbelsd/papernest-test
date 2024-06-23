import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { taskReducer } from './store/task.reducer';
import { TaskService } from './services/task.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListModule } from './components/todo-list/todo-list.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TaskEffects } from './store/task.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TodoListModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),

  ],
  providers: [TaskService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
