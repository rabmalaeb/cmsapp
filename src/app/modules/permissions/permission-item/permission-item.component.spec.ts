import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionItemComponent } from './permission-item.component';

describe('PermissionItemComponent', () => {
  let component: PermissionItemComponent;
  let fixture: ComponentFixture<PermissionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
