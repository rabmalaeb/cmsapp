import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageKeysComponent } from './languageKeys.component';

describe('LanguageKeysComponent', () => {
  let component: LanguageKeysComponent;
  let fixture: ComponentFixture<LanguageKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
