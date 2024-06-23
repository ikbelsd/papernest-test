import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TodoInputComponent } from './todo-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  // Set up the test environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoInputComponent], // Declare the component being tested
      imports: [
        FormsModule, // Import necessary modules for the component
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
    }).compileComponents(); 
  });

  // Initialize the component and fixture before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test that the addTask event is emitted with the correct value when the button is clicked
  it('should emit addTask event when Add Task button is clicked', () => {
    const spy = jest.spyOn(component.addTask, 'emit'); // Spy on the addTask event emitter
    component.title = 'New Task'; // Set the title for the task
    fixture.nativeElement.querySelector('button').click(); // Simulate button click
    expect(spy).toHaveBeenCalledWith('New Task'); // Verify that the event was emitted with the correct value
  });
});
