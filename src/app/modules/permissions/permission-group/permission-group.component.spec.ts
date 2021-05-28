import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionGroupComponent } from './permission-group.component';

describe('PermissionGroupComponent', () => {
  let component: PermissionGroupComponent;
  let fixture: ComponentFixture<PermissionGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
