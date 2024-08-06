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
      created_at: '2024-08-08T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description for Task 2',
      status: 'Completed',
      priority: 'Low',
      due_date: '2024-12-31',
      created_at: '2024-08-08T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description for Task 3',
      status: 'Not Started',
      priority: 'Medium',
      due_date: '2024-09-31',
      created_at: '2024-08-08T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '41',
      title: 'Task 41',
      description: 'Description for Task 41',
      status: 'Not Started',
      priority: 'Medium',
      due_date: '2024-09-31',
      created_at: '2024-08-08T00:00:00Z',
      updated_at: '2024-08-02T00:00:00Z',
    },
    {
      id: '52',
      title: 'Task 52',
      description: 'Description for Task 52',
      status: 'Not Started',
      priority: 'Medium',
      due_date: '2024-09-31',
      created_at: '2024-08-08T00:00:00Z',
      updated_at: '2024-08-02T00:00:00Z',
    },
  ];

  private usersDatabase: any[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
    },
    {
      id: 3,
      name: 'Roy Smith',
      email: 'roy.smith@example.com',
      role: 'User',
    },
  ];

  private taskAssignmentsDatabase: any[] = [
    {
      id: '1',
      taskId: '1',
      userId: '1',
      title: 'Task 1',
      assignedAt: '2024-08-15T00:00:00Z',
    },
    {
      id: '2',
      taskId: '2',
      userId: '2',
      title: 'Task 2',
      assignedAt: '2024-08-16T00:00:00Z',
    },
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

    const currentDate = new Date().toISOString();
    task.created_at = currentDate;
    task.updated_at = currentDate;

    task.id = Math.floor(Math.random() * 1000);
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
      this.tasksDatabase[index] = { ...updatedTask, updated_at: new Date().toISOString() };
    }
    return of(this.tasksDatabase[index]);
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

  
  getUser(userId: string): Observable<any> {
    const user = this.usersDatabase.find((user) => user.id == userId);
    return of(user);
  }

  addTaskAssignment(taskId: string, userId: string, title: string, description: string): Observable<any> {
    const currentDate = new Date().toISOString();
    const newAssignment = {
      id: `a${Math.floor(Math.random() * 1000)}`, // Generate a unique ID for the assignment
      taskId,
      userId,
      title,
      description,
      assignedAt: currentDate,
    };
  
    this.taskAssignmentsDatabase.push(newAssignment);
    return of(newAssignment);
  }

  listTaskAssignments(): Observable<any[]> {
    return of(this.taskAssignmentsDatabase);
  }


  
  getUsers(): Observable<any[]> {
    return of(this.usersDatabase);
  }

  getTaskAssignmentsByTaskId(taskId: string): Observable<any[]> {
    // Filter the task assignments based on the provided taskId
    const filteredAssignments = this.taskAssignmentsDatabase.filter(assignment => assignment.taskId === taskId);
    return of(filteredAssignments);
  }

  
  updateAssignee(taskId: string, assignment: any): Observable<any> {
    return of(assignment);
  }
}
