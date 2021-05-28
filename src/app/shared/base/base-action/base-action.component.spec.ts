import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseActionComponent } from './base-action.component';

describe('BaseActionComponent', () => {
  let component: BaseActionComponent;
  let fixture: ComponentFixture<BaseActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
