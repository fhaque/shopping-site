import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { IItemList } from '../../models/items.model';
import { id } from '../../models/items.model';
import { DisplayItemsActions } from '../../actions/display-items.actions';

@Component({
  selector: 'display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent {
  readonly  items$: Observable<id>;

  constructor(
    ngRedux: NgRedux<IAppState>,
    actions: DisplayItemsActions
  ) {
    this.items$ = ngRedux.select<id>('displayItems');
    ngRedux.dispatch( actions.addItem('25') );
  }

}
