import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { IItemCount, IItem } from '../../models/items.model';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-cart-btn',
  templateUrl: './shopping-cart-btn.component.html',
  styleUrls: ['./shopping-cart-btn.component.css']
})
export class ShoppingCartBtnComponent {
  readonly cart$: Observable<IItemCount>;
  readonly numOfItems$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
  ) { 
    this.cart$ = ngRedux.select<IItemCount>('shoppingCart');
    this.numOfItems$ = this.cart$
      .map( cart => Object.keys(cart).reduce( (acc, key) => acc + cart[key], 0) );
  }

  onClick() {
    this.router.navigate(['/shopping-cart']);
  }
}
