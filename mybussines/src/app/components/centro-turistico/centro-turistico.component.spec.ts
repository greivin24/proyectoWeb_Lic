import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroTuristicoComponent } from './centro-turistico.component';

describe('CentroTuristicoComponent', () => {
  let component: CentroTuristicoComponent;
  let fixture: ComponentFixture<CentroTuristicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroTuristicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroTuristicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
