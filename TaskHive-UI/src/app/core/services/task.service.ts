import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  toggleTask(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/toggle`, {})
      .pipe(catchError(this.handleError));
  }

  searchTasks(query: string): Observable<Task[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Task[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError(this.handleError));
  }

  getTasksByPriority(priority: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/priority/${priority}`)
      .pipe(catchError(this.handleError));
  }

  getTasksByCategory(category: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  getTasksByDueDate(dueDate: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/due-date/${dueDate}`)
      .pipe(catchError(this.handleError));
  }

  getUpcomingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/upcoming`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}