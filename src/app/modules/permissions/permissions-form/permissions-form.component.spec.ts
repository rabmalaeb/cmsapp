import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PermissionsFormComponent } from './permissions-form.component';

describe('PermissionsFormComponent', () => {
  let component: PermissionsFormComponent;
  let fixture: ComponentFixture<PermissionsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
