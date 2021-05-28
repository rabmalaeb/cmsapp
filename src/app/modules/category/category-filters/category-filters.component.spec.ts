import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryFiltersComponent } from './category-filters.component';

describe('CategoryFiltersComponent', () => {
  let component: CategoryFiltersComponent;
  let fixture: ComponentFixture<CategoryFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
