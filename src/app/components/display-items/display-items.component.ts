import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { IItemList, IItemsRef, IItem } from '../../models/items.model';
import { IFilterSettings } from '../../models/filters.model';
import { id } from '../../models/items.model';

import { DisplayItemsActions } from '../../actions/display-items.actions';

import { filterItems } from '../../helpers/filter-items.helper';


@Component({
  selector: 'display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent {
  readonly  items$:   Observable<IItem[]>;
  readonly  filters$: Observable<IFilterSettings>;

  constructor(
    private ngRedux:              NgRedux<IAppState>,
    private displayItemsactions:  DisplayItemsActions
  ) {
      const itemsObservable: Observable<IItemsRef> = ngRedux.select<IItemsRef>(['itemList', 'items']);
      this.filters$ = ngRedux.select<IFilterSettings>('filters');
      
      //whenever update comes from filter or items stream, update the displayed items Observable
      //with the filter applied to the items from their respective streams.
      //The result items observable is an array of the items.
      this.items$ = Observable
        .combineLatest(itemsObservable, this.filters$)
        .map( (combined: [IItemsRef, IFilterSettings])  => filterItems(combined[0], combined[1]) )
        .map( items => Object.keys(items).map( key => items[key] ) );
  }
}
