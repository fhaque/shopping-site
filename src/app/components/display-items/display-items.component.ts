import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { IItemList, IItem } from '../../models/items.model';
import { id } from '../../models/items.model';
import { DisplayItemsActions } from '../../actions/display-items.actions';


@Component({
  selector: 'display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent {
  readonly  items$: Observable<IItem[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private displayItemsactions: DisplayItemsActions
  ) {
    // this.items$ = ngRedux.select<id[]>('displayItems').map( (item) => item.map(l => l + 'a') );
    this.items$ = ngRedux.select<id[]>('displayItems').map( ids => {
      const { itemList } = ngRedux.getState();
      return ids.map( id => itemList.items[id] );
    });
    ngRedux.dispatch( displayItemsactions.addItem('0') );
    ngRedux.dispatch( displayItemsactions.addItem('8ch') );
  }
}
