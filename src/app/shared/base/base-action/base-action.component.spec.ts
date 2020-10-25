import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseActionComponent } from './base-action.component';

describe('BaseActionComponent', () => {
  let component: BaseActionComponent;
  let fixture: ComponentFixture<BaseActionComponent>;

  beforeEach(async(() => {
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
