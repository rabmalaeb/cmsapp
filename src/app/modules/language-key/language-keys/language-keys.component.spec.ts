import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LanguageKeysComponent } from './language-keys.component';

describe('LanguageKeysComponent', () => {
  let component: LanguageKeysComponent;
  let fixture: ComponentFixture<LanguageKeysComponent>;

  beforeEach(waitForAsync(() => {
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
