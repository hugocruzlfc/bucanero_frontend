import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeContractComponent } from './see-contract.component';

describe('SeeContractComponent', () => {
  let component: SeeContractComponent;
  let fixture: ComponentFixture<SeeContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
