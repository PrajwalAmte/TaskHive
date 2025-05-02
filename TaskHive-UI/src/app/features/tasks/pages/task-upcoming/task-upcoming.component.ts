import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskItemComponent } from '../../components/task-item/task-item.component';

@Component({
  selector: 'app-task-upcoming',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskItemComponent],
  templateUrl: './task-upcoming.component.html',
  styleUrls: ['./task-upcoming.component.css']
})
export class TaskUpcomingComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void {
    this.loading = true;
    this.taskService.getUpcomingTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load upcoming tasks';
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
}