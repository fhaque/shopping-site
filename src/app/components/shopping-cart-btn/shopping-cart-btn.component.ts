import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/reduce';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { IItemCount } from '../../models/items.model';

@Component({
  selector: 'shopping-cart-btn',
  templateUrl: './shopping-cart-btn.component.html',
  styleUrls: ['./shopping-cart-btn.component.css']
})
export class ShoppingCartBtnComponent {
  items: Observable<IItemCount>;
  numOfItems: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { 
    this.items = ngRedux.select<IItemCount>('shoppingCart');
    this.numOfItems = this.items
      .map( cart => Object.keys(cart).reduce( (acc, key) => acc + cart[key], 0) );
  }
}
