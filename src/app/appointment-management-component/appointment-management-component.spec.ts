import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentManagementComponent } from './appointment-management-component';

describe('AppointmentManagementComponent', () => {
  let component: AppointmentManagementComponent;
  let fixture: ComponentFixture<AppointmentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentManagementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
