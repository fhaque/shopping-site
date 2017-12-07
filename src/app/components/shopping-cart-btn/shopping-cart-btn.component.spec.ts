import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartBtnComponent } from './shopping-cart-btn.component';

xdescribe('ShoppingCartBtnComponent', () => {
  let component: ShoppingCartBtnComponent;
  let fixture: ComponentFixture<ShoppingCartBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
