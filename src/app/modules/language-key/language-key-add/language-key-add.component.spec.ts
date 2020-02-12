import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageKeyAddComponent } from './language-key-add.component';

describe('LanguageKeyAddComponent', () => {
  let component: LanguageKeyAddComponent;
  let fixture: ComponentFixture<LanguageKeyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageKeyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageKeyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
