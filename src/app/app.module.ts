import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent }           from './app.component';
import { DisplayItemsComponent }  from './components/display-items/display-items.component';

import { DisplayItemsActions }  from './actions/display-items.actions';
import { ItemsActions }         from './actions/items.actions';
import { ShoppingCartActions }  from './actions/shopping-cart.actions';
import { FilterActions }        from './actions/filter.actions';

import { IAppState }                from './models/app.model';
import { store }                    from './store/store';
import { ItemComponent }            from './components/item/item.component';
import { ShoppingCartBtnComponent } from './components/shopping-cart-btn/shopping-cart-btn.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayItemsComponent,
    ItemComponent,
    ShoppingCartBtnComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [
    DisplayItemsActions,
    ItemsActions,
    ShoppingCartActions,
    FilterActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( ngRedux: NgRedux<IAppState> ) {
    ngRedux.provideStore(store);
  }

}
