import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFiltersComponent } from './permission-filters.component';

describe('PermissionFiltersComponent', () => {
  let component: PermissionFiltersComponent;
  let fixture: ComponentFixture<PermissionFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
