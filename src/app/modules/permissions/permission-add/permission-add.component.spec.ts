import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionAddComponent } from './permission-add.component';

describe('PermissionAddComponent', () => {
  let component: PermissionAddComponent;
  let fixture: ComponentFixture<PermissionAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
