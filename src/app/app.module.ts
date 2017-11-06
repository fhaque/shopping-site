import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { DisplayItemsComponent } from './components/display-items/display-items.component';

import { DisplayItemsActions } from './actions/display-items.actions';
import { ItemsActions } from './actions/items.actions';
import { ShoppingCartActions } from './actions/shopping-cart.actions';

import { IAppState } from './models/app.model';
import { store } from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    DisplayItemsComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [
    DisplayItemsActions,
    ItemsActions,
    ShoppingCartActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( ngRedux: NgRedux<IAppState> ) {
    ngRedux.provideStore(store);
  }

}
