import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterControlComponent } from './filter-control.component';

describe('FilterControlComponent', () => {
  let component: FilterControlComponent;
  let fixture: ComponentFixture<FilterControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
