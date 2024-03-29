import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageKeyFiltersComponent } from './language-key-filters.component';

describe('LanguageKeyFiltersComponent', () => {
  let component: LanguageKeyFiltersComponent;
  let fixture: ComponentFixture<LanguageKeyFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageKeyFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageKeyFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
