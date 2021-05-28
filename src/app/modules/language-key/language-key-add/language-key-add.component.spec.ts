import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageKeyAddComponent } from './language-key-add.component';

describe('LanguageKeyAddComponent', () => {
  let component: LanguageKeyAddComponent;
  let fixture: ComponentFixture<LanguageKeyAddComponent>;

  beforeEach(waitForAsync(() => {
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
