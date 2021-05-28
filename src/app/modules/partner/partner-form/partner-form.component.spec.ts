import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PartnerFormComponent } from './partner-form.component';

describe('PartnerFormComponent', () => {
  let component: PartnerFormComponent;
  let fixture: ComponentFixture<PartnerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
