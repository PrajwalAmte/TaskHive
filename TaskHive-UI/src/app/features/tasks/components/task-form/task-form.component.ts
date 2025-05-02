import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task = this.getEmptyTask();
  @Input() submitButtonText: string = 'Create Task';
  @Output() submitTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  categories: string[] = ['Work', 'Personal', 'Health', 'Finance', 'Education', 'Other'];
  minDate: string = new Date().toISOString().split('T')[0];
  
  constructor() {}
  
  ngOnInit(): void {
    // If this is a new task, set default values
    if (!this.task.id) {
      this.task = this.getEmptyTask();
    }
  }
  
  onSubmit(): void {
    this.submitTask.emit(this.task);
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  private getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'MEDIUM',
      category: 'Other',
      completed: false
    };
  }
}