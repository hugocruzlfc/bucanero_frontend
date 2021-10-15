import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtachedComponent } from './atached.component';

describe('AtachedComponent', () => {
  let component: AtachedComponent;
  let fixture: ComponentFixture<AtachedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtachedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
