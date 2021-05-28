import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslationAddComponent } from './translation-add.component';

describe('TranslationAddComponent', () => {
  let component: TranslationAddComponent;
  let fixture: ComponentFixture<TranslationAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
