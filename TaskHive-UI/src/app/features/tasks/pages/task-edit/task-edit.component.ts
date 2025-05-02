import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.loadTask();
  }
  
  loadTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'Invalid task ID';
      this.loading = false;
      return;
    }
    
    // Since the backend API doesn't have a get by ID endpoint,
    // we'll get all tasks and find the one we want
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
          this.task = task;
        } else {
          this.error = 'Task not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load task';
        this.loading = false;
      }
    });
  }
  
  onSubmit(task: Task): void {
    // Since the backend doesn't have an update endpoint,
    // we'll simulate it by deleting and creating a new task
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.taskService.createTask(task).subscribe({
            next: () => {
              this.notificationService.success('Task updated successfully');
              this.router.navigate(['/tasks']);
            },
            error: (err) => {
              this.notificationService.error('Failed to update task');
            }
          });
        },
        error: (err) => {
          this.notificationService.error('Failed to update task');
        }
      });
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}