import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../services/app.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from '../../models/app.model';
import { IItem, IItemCount } from '../../models/items.model';

@Component({
  selector: 'display-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCart$: Observable<Array<[IItem, number]>>

  constructor(
    private appService: AppService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() {
    this.shoppingCart$ = this.ngRedux.select<IItemCount>('shoppingCart')
      .switchMap( (cart: IItemCount) =>
        Observable
          .zip(
            // 1. Take all item Ids in shopping cart
            ...Object.keys(cart).map( id =>
              this.appService
                // 2. Get data of each item
                .getItem(id)
                // 3. Create array of item with its shopping cart count
                .map( (item: IItem) => <[IItem, number]>[item, cart[id]] ) 
            )
          )
      );
  }

}
