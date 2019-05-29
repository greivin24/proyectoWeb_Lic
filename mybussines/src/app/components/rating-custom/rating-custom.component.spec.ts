import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCustomComponent } from './rating-custom.component';

describe('RatingCustomComponent', () => {
  let component: RatingCustomComponent;
  let fixture: ComponentFixture<RatingCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
