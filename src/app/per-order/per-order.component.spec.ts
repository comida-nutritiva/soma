import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerOrderComponent } from './per-order.component';

describe('PerOrderComponent', () => {
  let component: PerOrderComponent;
  let fixture: ComponentFixture<PerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
