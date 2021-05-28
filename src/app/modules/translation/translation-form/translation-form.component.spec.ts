import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslationFormComponent } from './translation-form.component';

describe('TranslationFormComponent', () => {
  let component: TranslationFormComponent;
  let fixture: ComponentFixture<TranslationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
