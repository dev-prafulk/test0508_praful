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

  submitted!: boolean;

  clonedProducts: { [s: string]: any } = {};
  clonedTasks: { [s: string]: any } = {};
  productDialog: boolean = false;
  product: any;
  showAddDialog: boolean =false;
  priorities!: { label: string; value: string; }[];


  constructor(private fb:FormsModule, private messageService: MessageService,private confirmationService: ConfirmationService, private mockApiService: MockApiService) {}
  

  ngOnInit() {
      // this.tasks = [
      //   {
      //     "id": "12345",
      //     "title": "Project Alpha Phase 1",
      //     "description": "Initial phase of Project Alpha, focusing on research and development.",
      //     "status": "In Progress",
      //     "priority": "High",
      //     "due_date": "2024-12-31",
      //     "created_at": "2024-08-05T10:00:00Z",
      //     "updated_at": "2024-08-05T10:30:00Z"
      //   },
      //   {
      //     "id": "212223",
      //     "title": "Project Eta Phase 7",
      //     "description": "Seventh phase of Project Eta, aiming for scalability improvements.",
      //     "status": "Completed",
      //     "priority": "High",
      //     "due_date": "2026-04-15",
      //     "created_at": "2025-03-30T04:00:00Z",
      //     "updated_at": "2025-04-01T06:00:00Z"
      //   },
      //   {
      //     "id": "232425",
      //     "title": "Project Theta Phase 8",
      //     "description": "Eighth phase of Project Theta, focusing on security enhancements.",
      //     "status": "On Hold",
      //     "priority": "Medium",
      //     "due_date": "2026-07-20",
      //     "created_at": "2025-05-05T07:00:00Z",
      //     "updated_at": "2025-05-07T09:00:00Z"
      //   },
      //   {
      //     "id": "252627",
      //     "title": "Project Iota Phase 9",
      //     "description": "Ninth phase of Project Iota, emphasizing data analytics integration.",
      //     "status": "In Review",
      //     "priority": "Low",
      //     "due_date": "2026-10-25",
      //     "created_at": "2025-06-20T10:00:00Z",
      //     "updated_at": "2025-06-22T12:00:00Z"
      //   },
      //   {
      //     "id": "262728",
      //     "title": "Project Kappa Phase 10",
      //     "description": "Tenth phase of Project Kappa, dedicated to launching the final product version.",
      //     "status": "Not Started",
      //     "priority": "High",
      //     "due_date": "2027-01-31",
      //     "created_at": "2025-07-15T13:00:00Z",
      //     "updated_at": "2025-07-17T15:00:00Z"
      //   }
      // ]
      this.fetchTasks();


      this.statuses = [
          { label: 'To DO', value: 'Not Started' },
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
          this.mockApiService.updateTask(task.id.toString(), task).subscribe(() => {
            this.fetchTasks();      
      })
    }

    onRowEditSave(item: any) {
          delete this.clonedTasks[item.id];
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task is updated' });
    }

    onRowEditCancel(product: any, index: number) {        
        this.tasks[index] = this.clonedTasks[product.id];
        delete this.clonedTasks[product.id];
    }

    
    hideDialog() {
      // this.productDialog = false;
      // this.submitted = false;
    }

  
    saveProduct() {
    }  
    
    openNew() {
      // this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.showAddDialog = true;
  }

  
  // getSeverity(status: string) {
  //   switch (status) {
  //           case 'INSTOCK':
  //               return 'success';
  //           case 'LOWSTOCK':
  //               return 'warning';
  //           case 'OUTOFSTOCK':
  //               return 'danger';
  //       }
  // }


  
  editProduct(product: any) {
    this.product = { ...product };
      this.productDialog = true;
  }

  
  deleteProduct(item: any) {
      console.log("item========", item);
      
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

}