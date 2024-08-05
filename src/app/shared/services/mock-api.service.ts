import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private apiUrl = environment.apiUrl; 

  private tasksDatabase: any[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'In Progress',
      priority: 'High',
      due_date: '2024-08-31',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'Completed',
      priority: 'Low',
      due_date: '2024-12-31',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'Not Started',
      priority: 'Medium',
      due_date: '2024-09-31',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    // Add more tasks as needed
  ];

  constructor(private http: HttpClient) {}

  // getTasks(): Observable<any[]> {
  //   return of(this.tasksDatabase);
  // }

  getTasks(): Observable<any[]> {
    
    if (environment.apiUrl == '#') {
      return of(this.tasksDatabase);
    } else {
      return this.http.get<any[]>(`${this.apiUrl}/tasks`);
    }
  }

  createTask(task: any): Observable<any> {
    task.id = Math.floor(Math.random() * 10000);
    this.tasksDatabase = [...this.tasksDatabase, task];
    return of(task);
  }

  getTaskById(id: string): Observable<any> {
    // Find the task in tasksDatabase by its ID
    const task = this.tasksDatabase.find((task) => task.id === id);

    // Return the found task wrapped in an Observable
    return of(task);
  }

  updateTask(id: string, updatedTask: any): Observable<any> {
    const index = this.tasksDatabase.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasksDatabase[index] = updatedTask;
    }
    return of(updatedTask);
  }

  deleteTask(id: string): Observable<any> {
    this.tasksDatabase = this.tasksDatabase.filter((task) => task.id !== id); // Remove the task
    return of({});
  }

  assignTask(taskId: string, assignment: any): Observable<any> {
    return of(assignment);
  }

  unassignTask(taskId: string): Observable<any> {
    return of({});
  }

  addComment(taskId: string, comment: any): Observable<any> {
    return of(comment);
  }

  markAsComplete(taskId: string): Observable<any> {
    return of({
      id: taskId,
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'Completed',
      priority: 'Low',
      due_date: '2024-10-28',
      created_at: '2024-01-06T00:00:00Z',
      updated_at: '2024-01-07T00:00:00Z',
    });
  }

  getOverdueTasks(): Observable<any[]> {
    return of([
      {
        title: 'Overdue Task 1',
        description: 'An important task that was missed.',
        status: 'Overdue',
        priority: 'High',
        due_date: '2024-09-30',
        created_at: '2024-01-08T00:00:00Z',
        updated_at: '2024-01-09T00:00:00Z',
      },
    ]);
  }

  getProjectProgress(projectId: string): Observable<any> {
    return of({
      progress: 75.5,
    });
  }
}
