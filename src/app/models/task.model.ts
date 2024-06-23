export interface Task {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    ttl?: number; // Optional time to live in milliseconds
  }
  