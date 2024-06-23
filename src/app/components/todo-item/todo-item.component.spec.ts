import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoItemComponent } from './todo-item.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../shared/material.module';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    // Setting up a sample task for testing
    component.task = {
      id: 1,
      title: 'Test Task',
      completed: false,
      createdAt: new Date(),
      ttl: 0
    };
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that editTask event is emitted with correct task when edit button is clicked
  it('should emit editTask event when edit button is clicked', () => {
    jest.spyOn(component.editTask, 'emit');
    const editButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    editButton.click();
    expect(component.editTask.emit).toHaveBeenCalledWith(component.task);
  });

  // Verify that editTask event is not emitted if the task is completed
  it('should not emit editTask event if task is completed', () => {
    component.task.completed = true;
    fixture.detectChanges();
    jest.spyOn(component.editTask, 'emit');
    const editButton = fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    editButton.click();
    expect(component.editTask.emit).not.toHaveBeenCalled();
  });

  // Verify that deleteTask event is emitted with correct task id when delete button is clicked
  it('should emit deleteTask event when delete button is clicked', () => {
    jest.spyOn(component.deleteTask, 'emit');
    const deleteButton = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'))[1].nativeElement;
    deleteButton.click();
    expect(component.deleteTask.emit).toHaveBeenCalledWith(component.task.id);
  });

  // Verify that toggleTask event is emitted with correct task id when checkbox is clicked
  it('should emit toggleTask event when checkbox is clicked', () => {
    jest.spyOn(component.toggleTask, 'emit');
    const checkbox = fixture.debugElement.query(By.css('mat-checkbox input')).nativeElement;
    checkbox.click();
    expect(component.toggleTask.emit).toHaveBeenCalledWith(component.task.id);
  });
});
