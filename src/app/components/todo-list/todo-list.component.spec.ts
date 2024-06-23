import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TodoListComponent } from './todo-list.component';
import { TodoInputModule } from '../todo-input/todo-input.module';
import { TodoItemModule } from '../todo-item/todo-item.module';
import { TodoSearchModule } from '../todo-search/todo-search.module';
import { Task } from '../../models/task.model';
import { addTask, loadTasks, editTask, deleteTask, toggleTask, reorderTasks } from '../../store/task.actions';
import { MaterialModule } from '../../shared/material.module';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;
  const initialState = { tasks: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        StoreModule.forRoot({}),
        DragDropModule,
        ScrollingModule,
        MaterialModule,
        TodoInputModule,
        TodoItemModule,
        TodoSearchModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that loadTasks action is dispatched on component initialization
  it('should dispatch loadTasks on init', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadTasks());
  });

  // Verify that addTask action is dispatched with correct payload
  it('should add a task', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const title = 'Test Task';
    component.onAddTask(title);
    const dispatchedAction = spy.mock.calls[0][0];
    expect(dispatchedAction).toEqual({
      type: addTask.type,
      task: {
        id: expect.any(Number),
        title: 'Test Task',
        completed: false,
        createdAt: expect.any(Date),
        ttl: 0
      }
    });
  });

  // Verify that editTask action is dispatched with correct payload
  it('should edit a task', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const editedTask = { id: 1, title: 'Edited Task', completed: false, createdAt: new Date(), ttl: 1000 };
    component.taskToEdit = editedTask;
    component.saveTask();
    const dispatchedAction = spy.mock.calls[0][0];
    expect(dispatchedAction.type).toEqual(editTask.type);
    expect(dispatchedAction).toEqual(expect.objectContaining({
      type: editTask.type,
      task: expect.objectContaining({
        id: 1,
        title: 'Edited Task',
        completed: false,
        ttl: 1000
      })
    }));
  });

  // Verify that deleteTask action is dispatched with correct payload
  it('should delete a task', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.onDeleteTask(1);
    expect(spy).toHaveBeenCalledWith(deleteTask({ id: 1 }));
  });

  // Verify that toggleTask action is dispatched with correct payload
  it('should toggle a task', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.onToggleTask(1);
    expect(spy).toHaveBeenCalledWith(toggleTask({ id: 1 }));
  });

  // Verify that the tasks are filtered correctly based on search term
  it('should search tasks', () => {
    component.tasks = [
      { id: 1, title: 'Task 1', completed: false, createdAt: new Date() },
      { id: 2, title: 'Task 2', completed: false, createdAt: new Date() }
    ];
    component.onSearchTask('Task 1');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task 1');
  });

  // Verify that the reorderTasks action is dispatched correctly on drag and drop
  it('should handle drag and drop', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.filteredTasks = [
      { id: 1, title: 'Task 1', completed: false, createdAt: new Date() },
      { id: 2, title: 'Task 2', completed: false, createdAt: new Date() }
    ];
    const event = {
      previousIndex: 0,
      currentIndex: 1,
      item: { data: component.filteredTasks[0], reset: jest.fn() }
    } as unknown as CdkDragDrop<Task[]>;
    component.drop(event);
    const expectedTasks = [
      { id: 2, title: 'Task 2', completed: false, createdAt: component.filteredTasks[1].createdAt },
      { id: 1, title: 'Task 1', completed: false, createdAt: component.filteredTasks[0].createdAt }
    ];
    expect(spy).toHaveBeenCalledWith(reorderTasks({ tasks: expectedTasks }));
  });
});
