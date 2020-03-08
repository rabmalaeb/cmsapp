import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFiltersComponent } from './partner-filters.component';

describe('PartnerFiltersComponent', () => {
  let component: PartnerFiltersComponent;
  let fixture: ComponentFixture<PartnerFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
