Sure! Here's a complete README for your project:

# Todo List Application

This is a Todo List application built with Angular and NgRx for state management. It includes features such as adding tasks, editing tasks, deleting tasks, toggling task completion, searching tasks, and reordering tasks using drag and drop. The application also supports TTL (time-to-live) for tasks and periodic checking for expired tasks.

## Live Version

You can view the live version of the application [here](https://master--papernest-test.netlify.app/).

## Features

- **Add Task:** Add a new task with an optional TTL value.
- **Edit Task:** Edit the title of an existing task.
- **Delete Task:** Delete a task.
- **Toggle Task:** Mark a task as completed or not completed.
- **Search Task:** Search tasks by title.
- **Reorder Tasks:** Drag and drop tasks to reorder them.
- **TTL Support:** Set a time-to-live for tasks and automatically remove expired tasks.

## Getting Started

### Prerequisites

- Node.js and npm installed. You can download them from [here](https://nodejs.org/).
- Angular CLI installed globally. You can install it using the following command:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To run the application locally, use the following command:
```bash
ng serve
```
Open your browser and navigate to `http://localhost:4200`.

### Running the Tests

To run the tests, use the following command:
```bash
npx jest
```

## Project Structure

- **src/app/components/todo-list/**: Contains the main todo list component.
- **src/app/components/todo-input/**: Contains the input component for adding tasks.
- **src/app/components/todo-item/**: Contains the item component for displaying individual tasks.
- **src/app/components/todo-search/**: Contains the search component for filtering tasks.
- **src/app/models/**: Contains the task model.
- **src/app/store/**: Contains NgRx actions, reducers, and selectors for managing the application state.

## Code Explanation

### `todo-list.component.ts`

This is the main component that manages the todo list. It handles adding tasks, editing tasks, deleting tasks, toggling task completion, searching tasks, and reordering tasks using drag and drop.

### `todo-list.component.html`

This is the template for the todo list component. It includes the input section, edit section, search section, and the task list section with drag and drop functionality.

### `todo-list.component.spec.ts`

This is the test spec for the todo list component. It includes tests for component creation, dispatching actions, and verifying the visibility of the TTL input field based on the edit mode.


## Thanks for the Opportunity

Thank you for the opportunity to complete this test for the job application. It has been a valuable and rewarding experience to showcase my skills and contribute to this project.