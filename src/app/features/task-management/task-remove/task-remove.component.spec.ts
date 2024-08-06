import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRemoveComponent } from './task-remove.component';

describe('TaskRemoveComponent', () => {
  let component: TaskRemoveComponent;
  let fixture: ComponentFixture<TaskRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
