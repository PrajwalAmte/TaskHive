import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskItemComponent } from '../../components/task-item/task-item.component';

@Component({
  selector: 'app-task-priority',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskItemComponent],
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.css']
})
export class TaskPriorityComponent implements OnInit {
  tasks: Task[] = [];
  priority: string = '';
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.priority = params.get('priority') || '';
      this.loadTasks();
    });
  }
  
  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasksByPriority(this.priority).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks';
        this.notificationService.error(this.error);
        this.loading = false;
      }
    });
  }
  
  onToggleTask(id: number): void {
    this.taskService.toggleTask(id).subscribe({
      next: () => {
        // Update local task state
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
          this.tasks = [...this.tasks];
          this.notificationService.success('Task status updated');
        }
      },
      error: (err) => {
        this.notificationService.error('Failed to update task status');
      }
    });
  }
  
  onDeleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          this.notificationService.success('Task deleted successfully');
        },
        error: (err) => {
          this.notificationService.error('Failed to delete task');
        }
      });
    }
  }
  
  getPriorityClass(): string {
    switch (this.priority.toUpperCase()) {
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return '';
    }
  }
}