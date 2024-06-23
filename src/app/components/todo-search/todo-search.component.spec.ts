import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoSearchComponent } from './todo-search.component';
import { By } from '@angular/platform-browser';

describe('TodoSearchComponent', () => {
  let component: TodoSearchComponent;
  let fixture: ComponentFixture<TodoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoSearchComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that searchTask event is emitted with correct value when typing in the input field
  it('should emit searchTask event when typing', (done) => {
    jest.spyOn(component.searchTask, 'emit');
    
    // Simulate user typing in the input
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Wait for debounceTime of 300ms before checking if event was emitted
    setTimeout(() => {
      expect(component.searchTask.emit).toHaveBeenCalledWith('Test');
      done();
    }, 300); // Wait for debounceTime
  });
});
