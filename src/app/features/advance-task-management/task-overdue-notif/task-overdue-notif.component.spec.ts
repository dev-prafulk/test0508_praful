import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOverdueNotifComponent } from './task-overdue-notif.component';

describe('TaskOverdueNotifComponent', () => {
  let component: TaskOverdueNotifComponent;
  let fixture: ComponentFixture<TaskOverdueNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOverdueNotifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOverdueNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
