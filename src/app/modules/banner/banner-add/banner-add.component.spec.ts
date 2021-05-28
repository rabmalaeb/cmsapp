import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BannerAddComponent } from './banner-add.component';

describe('BannerAddComponent', () => {
  let component: BannerAddComponent;
  let fixture: ComponentFixture<BannerAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
