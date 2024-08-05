import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MockApiService } from 'src/app/shared/services/mock-api.service';

import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {

  constructor(private fb: FormBuilder, private mockApiService: MockApiService) {}
  

    // @Output() dialogClosed = new EventEmitter<void>();

    @Output() taskAdded = new EventEmitter<void>();

    @Input() visible: boolean = false;

    showDialog() {
        this.visible = true;
    }


  taskForm!: FormGroup;
  // taskModel: TaskModel = new TaskModel();

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      due_date: ['', Validators.required], // Assuming due_date is a Date
    });
  }


  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.mockApiService.createTask(newTask).subscribe(() => {
        this.taskAdded.emit(); // Notify parent component
        this.taskForm.reset();
        this.fetchTasks();
      }, error => {
        console.error('Failed to add task:', error);
      });
    }
  }


  handleDialogClose(){
    // this.dialogClosed.emit();

  }

  
  fetchTasks(): void {
    this.mockApiService.getTasks().subscribe((tasks: any) => {
      console.log("tasks------------------", tasks);
      
    });
  }
}
