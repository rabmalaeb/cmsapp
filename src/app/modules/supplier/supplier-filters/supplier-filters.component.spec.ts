import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFiltersComponent } from './supplier-filters.component';

describe('SupplierFiltersComponent', () => {
  let component: SupplierFiltersComponent;
  let fixture: ComponentFixture<SupplierFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
