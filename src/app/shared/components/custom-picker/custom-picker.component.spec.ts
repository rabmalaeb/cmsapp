import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomPickerComponent } from './custom-picker.component';

describe('CustomPickerComponent', () => {
  let component: CustomPickerComponent;
  let fixture: ComponentFixture<CustomPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
