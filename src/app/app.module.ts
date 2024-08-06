import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

import { TaskService } from 'src/app/shared/tasklist';
import { TaskListComponent } from './features/task-management/task-list/task-list.component';
import { TaskDetailsComponent } from './features/task-management/task-details/task-details.component';
import { TaskFormComponent } from './features/task-management/task-form/task-form.component';
import { TaskRemoveComponent } from './features/task-management/task-remove/task-remove.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { taskReducer } from 'src/app/shared/store-ngrx/task.reducer';
import { TaskEffects } from 'src/app/shared/store-ngrx/task.effects';
import { ProjectListComponent } from './features/advance-task-management/project-list/project-list.component';
import { ProjectDetailComponent } from './features/advance-task-management/project-detail/project-detail.component';
import { TaskAssignmentComponent } from './features/advance-task-management/task-assignment/task-assignment.component';
import { TaskCommentComponent } from './features/advance-task-management/task-comment/task-comment.component';
import { TaskOverdueNotifComponent } from './features/advance-task-management/task-overdue-notif/task-overdue-notif.component';
import { CustomButtonComponent } from './core/custom-button/custom-button.component';
import { GenericButtonWrapperComponent } from './core/generic-button-wrapper/generic-button-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskRemoveComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TaskAssignmentComponent,
    TaskCommentComponent,
    TaskOverdueNotifComponent,
    CustomButtonComponent,
    GenericButtonWrapperComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    BadgeModule,
    AnimateModule,
    CardModule,
    ToolbarModule,
    FileUploadModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    MatDialogModule,
    TabViewModule,
    BrowserAnimationsModule,

    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
