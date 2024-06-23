import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks'; // Key used for storing tasks in localStorage

  constructor() { }

  /**
   * Retrieves tasks from localStorage.
   * Filters out expired tasks based on their TTL (time-to-live).
   * @returns {Task[]} An array of tasks.
   */
  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey); // Get tasks from localStorage
    if (!tasksJson) return []; // Return empty array if no tasks found
    
    const tasks: Task[] = JSON.parse(tasksJson); // Parse tasks JSON
    const now = new Date().getTime(); // Get current time in milliseconds
    // Filter tasks to exclude those that have expired based on their TTL
    return tasks.filter(task => !task.ttl || new Date(task.createdAt).getTime() + task.ttl > now);
  }

  /**
   * Saves the given tasks array to localStorage.
   * @param {Task[]} tasks - The array of tasks to save.
   */
  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks)); // Save tasks to localStorage
  }

  /**
   * Adds a new task to the tasks array and saves it to localStorage.
   * @param {Task} task - The task to add.
   */
  addTask(task: Task): void {
    const tasks = this.getTasks(); // Get existing tasks
    tasks.push(task); // Add new task to the tasks array
    this.saveTasks(tasks); // Save updated tasks array to localStorage
  }
}
