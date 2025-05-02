import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  
  onSubmit(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this.notificationService.success('Task created successfully');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.notificationService.error('Failed to create task');
      }
    });
  }
  
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}