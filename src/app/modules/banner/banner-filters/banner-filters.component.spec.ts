import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BannerFiltersComponent } from './banner-filters.component';

describe('BannerFiltersComponent', () => {
  let component: BannerFiltersComponent;
  let fixture: ComponentFixture<BannerFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
