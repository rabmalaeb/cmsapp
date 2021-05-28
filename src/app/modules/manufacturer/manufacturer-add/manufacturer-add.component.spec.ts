import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManufacturerAddComponent } from './manufacturer-add.component';

describe('ManufacturerAddComponent', () => {
  let component: ManufacturerAddComponent;
  let fixture: ComponentFixture<ManufacturerAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
