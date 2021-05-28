import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormLoadingComponent } from './form-loading.component';

describe('FormLoadingComponent', () => {
  let component: FormLoadingComponent;
  let fixture: ComponentFixture<FormLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
