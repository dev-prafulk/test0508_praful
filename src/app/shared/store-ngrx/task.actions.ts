import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: any[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: any }>()
);

export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: any }>()
);

export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: any }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ id: string; updatedTask: any }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: any }>()
);

export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: any }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: any }>()
);
