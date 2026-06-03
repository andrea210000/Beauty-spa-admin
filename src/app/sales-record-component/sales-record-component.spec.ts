import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecordComponent } from './sales-record-component';

describe('SalesRecordComponent', () => {
  let component: SalesRecordComponent;
  let fixture: ComponentFixture<SalesRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRecordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesRecordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
