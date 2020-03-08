import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XModalComponent } from './x-modal.component';

describe('XModalComponent', () => {
  let component: XModalComponent;
  let fixture: ComponentFixture<XModalComponent>;

  beforeEach(async(() => {
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
