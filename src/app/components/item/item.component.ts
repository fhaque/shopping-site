import { Component, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { id, IItem } from '../../models/items.model';
import { ShoppingCartActions } from '../../actions/shopping-cart.actions';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: IItem;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private shoppingCartActions: ShoppingCartActions
  ) { }

  addToCart(id: id) {
    this.ngRedux.dispatch( this.shoppingCartActions.addItem(id) );
  }

}
