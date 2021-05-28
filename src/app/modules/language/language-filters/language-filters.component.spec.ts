import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageFiltersComponent } from './language-filters.component';

describe('LanguageFiltersComponent', () => {
  let component: LanguageFiltersComponent;
  let fixture: ComponentFixture<LanguageFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
