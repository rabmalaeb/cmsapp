import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleFiltersComponent } from './role-filters.component';

describe('RoleFiltersComponent', () => {
  let component: RoleFiltersComponent;
  let fixture: ComponentFixture<RoleFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
