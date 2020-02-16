import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageKeyFormComponent } from './language-key-form.component';

describe('LanguageKeyFormComponent', () => {
  let component: LanguageKeyFormComponent;
  let fixture: ComponentFixture<LanguageKeyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageKeyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageKeyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
