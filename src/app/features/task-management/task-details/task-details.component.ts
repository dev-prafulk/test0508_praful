import { Component, Input } from '@angular/core';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  @Input() isTaskDetailsVisible:boolean = false;
  @Input() taskDetails: any;
  assignee: any;
  users: any;
  newAssignee: any;
  selectedUser: any;

  
  constructor(private mockApiService: MockApiService) { }

  ngOnInit(): void {
    console.log('TaskDetailsComponent constructed', this.taskDetails);
    this.fetchAssigneeDetails(this.taskDetails.id);

    this.mockApiService.getUsers().subscribe(users => {
      this.users = users;
    });
    
  }

  
  fetchAssigneeDetails(taskId: string) {
      // Now find the assignment for this task
      this.mockApiService.getTaskAssignmentsByTaskId(taskId).subscribe(assignments => {

        console.log("assignments--", assignments);
        
        const assignment = assignments.find(a => a.taskId === taskId);
        if (assignment && assignment.userId) {
          // Fetch user details using the assignee's ID
          this.mockApiService.getUser(assignment.userId.toString()).subscribe(user => {
            this.assignee = user;

            console.log("assignee-----------------", this.assignee);
            
          });
        }
      });
  }

  
  onAssigneeChange(selectedUserName: any) {
    console.log("selectedUserName===", selectedUserName);
    selectedUserName = selectedUserName.target.value;
    console.log("selectedUserName===", selectedUserName);
    console.log("selectedUserName===", JSON.stringify(selectedUserName));

    this.selectedUser = selectedUserName;
    
    // Find the user in the users array based on the selected name
    const newUser = this.users.find((user: { name: string; }) => user.name === selectedUserName);
    if (newUser) {
      // Update the assignee with the newly selected user
      this.newAssignee = newUser;
      console.log("newAssignee----------------", this.newAssignee);
      
      
    }
  }

  
  confirmAssignee(): void {
    // Call your service to update the assignee in the database
    this.mockApiService.updateAssignee(this.selectedUser.id, this.taskDetails).subscribe(() => {
      console.log('Assignee updated successfully');
    }, (error: any) => {
      console.error('Failed to update assignee', error);
    });
  }

  cancelAssignee(): void {
    // Optionally reset the assignee or perform other actions
    this.assignee = null;
  }

}
