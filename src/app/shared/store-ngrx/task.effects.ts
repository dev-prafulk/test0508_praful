import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MockApiService } from 'src/app/shared/services/mock-api.service';
import * as TaskActions from './task.actions';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.loadTasks),
    switchMap(() =>
      this.mockApiService.getTasks().pipe(
        map(tasks => TaskActions.loadTasksSuccess({ tasks })),
        catchError(error => of(TaskActions.loadTasksFailure({ error })))
      )
    )
  ));

  createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.createTask),
    switchMap(({ task }) =>
      this.mockApiService.createTask(task).pipe(
        map(createdTask => TaskActions.createTaskSuccess({ task: createdTask })),
        catchError(error => of(TaskActions.createTaskFailure({ error })))
      )
    )
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.updateTask),
    switchMap(({ id, updatedTask }) =>
      this.mockApiService.updateTask(id, updatedTask).pipe(
        map(updated => TaskActions.updateTaskSuccess({ task: updated })),
        catchError(error => of(TaskActions.updateTaskFailure({ error })))
      )
    )
  ));

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskActions.deleteTask),
    switchMap(({ id }) =>
      this.mockApiService.deleteTask(id).pipe(
        map(() => TaskActions.deleteTaskSuccess({ id })),
        catchError(error => of(TaskActions.deleteTaskFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private mockApiService: MockApiService
  ) {}
}
