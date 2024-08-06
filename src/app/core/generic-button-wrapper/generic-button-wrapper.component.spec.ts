import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericButtonWrapperComponent } from './generic-button-wrapper.component';

describe('GenericButtonWrapperComponent', () => {
  let component: GenericButtonWrapperComponent;
  let fixture: ComponentFixture<GenericButtonWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericButtonWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericButtonWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
