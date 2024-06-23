import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  // Set up the test environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule // Import RouterTestingModule for router-related dependencies
      ],
      declarations: [
        AppComponent // Declare the AppComponent
      ],
    }).compileComponents(); // Compile the components
  });

  // Test case to verify the app component is created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Create the component fixture
    const app = fixture.componentInstance; // Get the component instance
    expect(app).toBeTruthy(); // Assert that the app instance is truthy
  });

  // Test case to verify the app's title is 'todo-app'
  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Create the component fixture
    const app = fixture.componentInstance; // Get the component instance
    expect(app.title).toEqual('todo-app'); // Assert that the app's title is 'todo-app'
  });
});
