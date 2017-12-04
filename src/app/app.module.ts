import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import logger                     from 'redux-logger';
import { RouterModule }           from '@angular/router';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule }            from '@angular/forms';


// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }            from './in-memory-data-service';

import { AppComponent }           from './app.component';
import { DisplayItemsComponent }  from './components/display-items/display-items.component';

import { DisplayItemsActions }  from './actions/display-items.actions';
import { ItemsActions }         from './actions/items.actions';
import { ShoppingCartActions }  from './actions/shopping-cart.actions';
import { FilterActions }        from './actions/filter.actions';
import { SearchHistoryActions } from './actions/search-history.actions';

// import { store }                    from './store/store';
import { rootReducer } from './reducers/root-reducer.reducer';
import { IAppState }                from './models/app.model';
import { INITIAL_STATE } from './store/initial-state';

import { ItemComponent }            from './components/item/item.component';
import { ShoppingCartBtnComponent } from './components/shopping-cart-btn/shopping-cart-btn.component';
import { FilterComponent }          from './components/filter/filter.component';
import { SearchBarComponent }       from './components/search-bar/search-bar.component';
import { HeaderComponent }          from './components/header/header.component';
import { SearchResultsComponent }   from './components/search-results/search-results.component';
import { WelcomeInfoComponent }     from './components/welcome-info/welcome-info.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { SearchHistoryListComponent } from './components/search-history-list/search-history-list.component';

import { appRoutes }  from './app.routes';

import { ApiService }               from './services/api.service';
import { AppService }               from './services/app.service';
import { TransformDataHelper }      from './services/transform-data.helper';
import { GetItemsEpic }             from './epics/get-items.epic';
import {  combineEpics, 
          createEpicMiddleware }    from 'redux-observable';
import { ShoppingCartComponent }    from './components/shopping-cart/shopping-cart.component';
import { LoginService } from './services/login.service';
import { LoginRouteGuard } from './services/login-route.guard';



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
    SearchHistoryComponent,
    SearchHistoryListComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
  ],
  providers: [
    DisplayItemsActions,
    ItemsActions,
    ShoppingCartActions,
    FilterActions,
    SearchHistoryActions,
    
    ApiService,
    AppService,
    TransformDataHelper,
    LoginService,

    GetItemsEpic,

    LoginRouteGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor( 
    ngRedux: NgRedux<IAppState>,
    getItemsEpic: GetItemsEpic,
   ) {
    const epics = combineEpics(
      getItemsEpic.getDefaultItems,
      getItemsEpic.getItemsByQuery,
    );
    
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [logger, createEpicMiddleware(epics)] );
    // ngRedux.provideStore(store);
  }

}
