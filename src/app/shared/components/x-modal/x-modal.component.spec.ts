import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { XModalComponent } from './x-modal.component';

describe('XModalComponent', () => {
  let component: XModalComponent;
  let fixture: ComponentFixture<XModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ XModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
