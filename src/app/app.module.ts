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
import { TaskListComponent } from './core/components/task-list/task-list.component';
import { TaskDetailsComponent } from './core/components/task-details/task-details.component';
import { TaskFormComponent } from './core/components/task-form/task-form.component';
import { TaskRemoveComponent } from './core/components/task-remove/task-remove.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

import { ProductService } from 'src/app/shared/productservice'
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TaskList2Component } from './core/components/task-list2/task-list2.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskFormComponent,
    TaskRemoveComponent,
    TaskList2Component
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

    BrowserAnimationsModule
  ],
  providers: [ TaskService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
