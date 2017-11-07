import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from './models/app.model';
import { ItemsActions } from './actions/items.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  constructor(
    ngRedux: NgRedux<IAppState>,
    actions: ItemsActions
  ) { 
    ngRedux.dispatch( actions.getDefaultItems() );
  }

}
