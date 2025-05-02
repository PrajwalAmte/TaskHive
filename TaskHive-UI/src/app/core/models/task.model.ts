export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string; // ISO date string
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  reminder?: string; // ISO datetime string, optional
  createdAt?: string; // ISO datetime string
  updatedAt?: string; // ISO datetime string
}