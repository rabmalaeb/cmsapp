import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageKeyComponent } from './languageKey.component';

describe('LanguageKeyComponent', () => {
  let component: LanguageKeyComponent;
  let fixture: ComponentFixture<LanguageKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
