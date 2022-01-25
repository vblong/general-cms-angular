import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoTDashboardComponent } from './io-tdashboard.component';

describe('IoTDashboardComponent', () => {
  let component: IoTDashboardComponent;
  let fixture: ComponentFixture<IoTDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoTDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IoTDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
