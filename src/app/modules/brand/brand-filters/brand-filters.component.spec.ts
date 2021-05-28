import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrandFiltersComponent } from './brand-filters.component';

describe('BrandFiltersComponent', () => {
  let component: BrandFiltersComponent;
  let fixture: ComponentFixture<BrandFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
