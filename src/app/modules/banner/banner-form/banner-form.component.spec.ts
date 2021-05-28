import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BannerFormComponent } from './banner-form.component';

describe('BannerFormComponent', () => {
  let component: BannerFormComponent;
  let fixture: ComponentFixture<BannerFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
