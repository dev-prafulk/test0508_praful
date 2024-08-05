// import { Component } from '@angular/core';
// import { TaskService } from 'src/app//shared/tasklist';
// import { Task } from 'src/app/shared/enum/task';
// import { MessageService, SelectItem } from 'primeng/api';

// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.scss']
// })
// export class TaskListComponent {

//   tasks!: Task[];

//   constructor(private taskService: TaskService) {}

//   ngOnInit() {
//     this.taskService.getTasksMini().then((data) => {
//           this.tasks = data;
//       });
//   }

// }


import { Component } from '@angular/core';
import { TaskService } from 'src/app//shared/tasklist';
import { Task } from 'src/app/shared/enum/task';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

import { MockApiService } from 'src/app/shared/services/mock-api.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskListComponent {
  tasks!: Task[];
  statuses!: SelectItem[];
  clonedTasks: { [s: string]: any } = {};
  productDialog: boolean = false;
  product: any;
  showAddDialog: boolean =false;
  taskToEdit: any;
  priorities!: { label: string; value: string; }[];
  editingTaskStatus!: string;

  constructor(private fb:FormsModule, private messageService: MessageService,private confirmationService: ConfirmationService, private mockApiService: MockApiService) {}
  
  ngOnInit() {
      this.fetchTasks();

      this.statuses = [
          { label: 'To Do', value: 'Not Started' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: 'Completed' }
      ];

      this.priorities = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

  }

  
  fetchTasks(): void {
    this.mockApiService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onRowEditInit(task: any) {
        if(this.clonedTasks){
          this.clonedTasks[task.id] = { ...task };
        }
        this.editingTaskStatus = task.status;

    }

    onRowEditSave(task: any) {
      this.mockApiService.updateTask(task.id.toString(), task).subscribe(() => {
        this.fetchTasks();  // Refresh the task list after update
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is updated' });
      });
    }
    
    onRowEditCancel(product: any, index: number) {        
        this.tasks[index] = this.clonedTasks[product.id];
        delete this.clonedTasks[product.id];
    }

    
    openNew() {
      this.taskToEdit = null;
      this.showAddDialog = true;
  }

  deleteProduct(item: any) {      
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + item.title + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.tasks = this.tasks.filter((val) => val.id !== item.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
          }
      });
  }

  updateTaskList(): void {
    this.fetchTasks();
    this.showAddDialog = false
  }

  getTaskStatus(task: any): string {
    return task.status ? task.status.toString() : '';
  }
  
  setTaskStatus(task: any, value: string) {
    task.status = value;
  }
    
  onEditComplete(task: any) {
    task.status = this.editingTaskStatus;
  }

  editTask(task: any): void {    
    this.taskToEdit = task;
    this.showAddDialog = true;
  }

  handleDialogClose(): void {
    this.showAddDialog = false;
  }

}