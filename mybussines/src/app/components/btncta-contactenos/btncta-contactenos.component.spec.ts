import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnctaContactenosComponent } from './btncta-contactenos.component';

describe('BtnctaContactenosComponent', () => {
  let component: BtnctaContactenosComponent;
  let fixture: ComponentFixture<BtnctaContactenosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnctaContactenosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnctaContactenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
