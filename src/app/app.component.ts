import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from './models/app.model';
import { ItemsActions } from './actions/items.actions';
import { AppService } from './services/app.service';
import { IItemsRef } from './models/items.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<string[]>;  

  constructor(
    ngRedux: NgRedux<IAppState>,
    actions: ItemsActions,
    appService: AppService
  ) { 
    ngRedux.dispatch( actions.getDefaultItems() );

    this.items = appService.getAllItems().map( itemsRef => Object.keys(itemsRef) );
  }

}
