import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCheckboxComponent } from './flex-checkbox.component';

describe('FlexCheckboxComponent', () => {
  let component: FlexCheckboxComponent;
  let fixture: ComponentFixture<FlexCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
