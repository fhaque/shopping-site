import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { RouterModule }           from '@angular/router';

import { AppComponent }           from './app.component';
import { DisplayItemsComponent }  from './components/display-items/display-items.component';

import { DisplayItemsActions }  from './actions/display-items.actions';
import { ItemsActions }         from './actions/items.actions';
import { ShoppingCartActions }  from './actions/shopping-cart.actions';
import { FilterActions }        from './actions/filter.actions';
import { SearchHistoryActions } from './actions/search-history.actions';

import { IAppState }                from './models/app.model';
import { store }                    from './store/store';
import { ItemComponent }            from './components/item/item.component';
import { ShoppingCartBtnComponent } from './components/shopping-cart-btn/shopping-cart-btn.component';
import { FilterComponent }          from './components/filter/filter.component';
import { SearchBarComponent }       from './components/search-bar/search-bar.component';
import { HeaderComponent }          from './components/header/header.component';
import { SearchResultsComponent }   from './components/search-results/search-results.component';
import { WelcomeInfoComponent }     from './components/welcome-info/welcome-info.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DisplayItemsComponent,
    ItemComponent,
    ShoppingCartBtnComponent,
    FilterComponent,
    SearchBarComponent,
    HeaderComponent,
    SearchResultsComponent,
    WelcomeInfoComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    DisplayItemsActions,
    ItemsActions,
    ShoppingCartActions,
    FilterActions,
    SearchHistoryActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( ngRedux: NgRedux<IAppState> ) {
    ngRedux.provideStore(store);
  }

}
