import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerFiltersComponent } from './manufacturer-filters.component';

describe('ManufacturerFiltersComponent', () => {
  let component: ManufacturerFiltersComponent;
  let fixture: ComponentFixture<ManufacturerFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
