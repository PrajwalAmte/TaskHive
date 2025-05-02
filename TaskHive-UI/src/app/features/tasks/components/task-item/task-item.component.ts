import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  
  getPriorityClass(priority: string): string {
    switch (priority.toUpperCase()) {
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
  
  getTimeAgo(dateString: string): string {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  }
  
  toggleTask(): void {
    if (this.task.id) {
      this.toggle.emit(this.task.id);
    }
  }
  
  deleteTask(): void {
    if (this.task.id) {
      this.delete.emit(this.task.id);
    }
  }
}