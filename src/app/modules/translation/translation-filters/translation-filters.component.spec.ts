import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationFiltersComponent } from './translation-filters.component';

describe('TranslationFiltersComponent', () => {
  let component: TranslationFiltersComponent;
  let fixture: ComponentFixture<TranslationFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
