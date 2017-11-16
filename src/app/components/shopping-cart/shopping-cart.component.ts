import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../services/app.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from '../../models/app.model';
import { IItem, IItemCount } from '../../models/items.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'display-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private shoppingCart$: Observable<{item:IItem, count:number}[]>;
  private itemCount: IItemCount = {};
  private itemCountSubscription: any;
  // itemQuantity: any = 0;

  constructor(
    private appService: AppService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() {

    this.itemCountSubscription = this.ngRedux
      .select<IItemCount>('shoppingCart')
      .subscribe( (cart: IItemCount) => this.itemCount = cart );

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
                .map( (item: IItem) => <{item:IItem, count:number}>{item:item, count:cart[id]} ) 
            )
          )
      );
    
      
  }

  handleKeyUp({id, count}) {
    console.log(this.itemCount, id, count);
    if ( !isNaN(count) ) {
      this.itemCount[id] = parseInt(count);
    }

    // console.log(this.itemCount);

    // // setTimeout(() => {
    //   this.itemQuantity = parseInt(count) || 0;
    //   console.log(this.itemQuantity);
    // // }, 1000);

  }

  removeItem(id: string) {
    this.itemCount[id] = 0;
  }

  saveCart() {
    console.log("saving Cart");
  }

  ngOnDestroy() {
    this.itemCountSubscription.unsubscribe();
  }

}
