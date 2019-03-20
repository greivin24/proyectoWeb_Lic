import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosTuristicosComponent } from './centros-turisticos.component';

describe('CentrosTuristicosComponent', () => {
  let component: CentrosTuristicosComponent;
  let fixture: ComponentFixture<CentrosTuristicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentrosTuristicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrosTuristicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
