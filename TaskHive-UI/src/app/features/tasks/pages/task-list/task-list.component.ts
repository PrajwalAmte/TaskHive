import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { TaskFiltersComponent } from '../../components/task-filters/task-filters.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TaskItemComponent,
    TaskFiltersComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
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
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
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
          this.filteredTasks = [...this.tasks];
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
          this.filteredTasks = this.filteredTasks.filter(t => t.id !== id);
          this.notificationService.success('Task deleted successfully');
        },
        error: (err) => {
          this.notificationService.error('Failed to delete task');
        }
      });
    }
  }
  
  onFilterChange(filter: { type: string, value: string }): void {
    if (filter.type === 'clear') {
      this.filteredTasks = this.tasks;
      return;
    }
    
    switch (filter.type) {
      case 'priority':
        if (filter.value === 'ALL') {
          this.filteredTasks = this.tasks;
        } else {
          this.filteredTasks = this.tasks.filter(t => 
            t.priority.toUpperCase() === filter.value
          );
        }
        break;
        
      case 'category':
        if (filter.value === 'ALL') {
          this.filteredTasks = this.tasks;
        } else {
          this.filteredTasks = this.tasks.filter(t => 
            t.category === filter.value
          );
        }
        break;
        
      case 'search':
        const query = filter.value.toLowerCase();
        this.filteredTasks = this.tasks.filter(t => 
          t.title.toLowerCase().includes(query) || 
          t.description.toLowerCase().includes(query)
        );
        break;
    }
  }
}