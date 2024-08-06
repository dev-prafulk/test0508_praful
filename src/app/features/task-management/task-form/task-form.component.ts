import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {

  @Input() visible: boolean = false;
  @Input() taskToEdit: any | null = null;
  @Output() taskAdded = new EventEmitter<void>();
  @Output() closeDialog = new EventEmitter<void>();
  
  showAddDialog: boolean = false;

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      due_date: ['', Validators.required], // Assuming due_date is a Date
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit']) {
      if (this.taskForm) {
        if (this.taskToEdit) {
          this.taskForm.patchValue(this.taskToEdit);
        } else {
          this.taskForm.reset();
          this.taskForm.patchValue({
            id: '',
            title: '',
            description: '',
            status: '',
            priority: '',
            due_date: ''
          });
        }
      }
    }
  }

  handleDialogClose(): void {
    this.closeDialog.emit();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.taskToEdit) {
        // Update existing task
        this.mockApiService.updateTask(taskData.id, taskData).subscribe(() => {
          this.taskAdded.emit(); 
          this.visible = false;
        }, error => {
          console.error('Failed to update task:', error);
        });
      } else {
        // Add new task
        this.mockApiService.createTask(taskData).subscribe(() => {
          this.taskAdded.emit(); // Notify parent component
          this.visible = false;
        }, error => {
          console.error('Failed to add task:', error);
        });
      }
    }
  }

}
