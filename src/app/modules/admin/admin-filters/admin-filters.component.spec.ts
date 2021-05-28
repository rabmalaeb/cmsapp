import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminFiltersComponent } from './admin-filters.component';

describe('AdminFiltersComponent', () => {
  let component: AdminFiltersComponent;
  let fixture: ComponentFixture<AdminFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
