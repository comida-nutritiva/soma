import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalFactComponent } from './nutritional-fact.component';

describe('NutritionalFactComponent', () => {
  let component: NutritionalFactComponent;
  let fixture: ComponentFixture<NutritionalFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionalFactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionalFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
