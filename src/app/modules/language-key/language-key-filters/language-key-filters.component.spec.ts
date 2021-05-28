import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageKeyFiltersComponent } from './language-key-filters.component';

describe('LanguageKeyFiltersComponent', () => {
  let component: LanguageKeyFiltersComponent;
  let fixture: ComponentFixture<LanguageKeyFiltersComponent>;

  beforeEach(waitForAsync(() => {
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
