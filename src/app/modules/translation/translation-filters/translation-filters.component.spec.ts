import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslationFiltersComponent } from './translation-filters.component';

describe('TranslationFiltersComponent', () => {
  let component: TranslationFiltersComponent;
  let fixture: ComponentFixture<TranslationFiltersComponent>;

  beforeEach(waitForAsync(() => {
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
