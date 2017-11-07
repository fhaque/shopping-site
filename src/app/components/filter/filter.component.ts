
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';

import { IAppState } from '../../models/app.model';
import { IFilterSettings } from '../../models/filters.model';
import { IItemsRef, IItem } from '../../models/items.model';

import { filterItems } from '../../helpers/filter-items.helper';


@Component({
  selector: 'items-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filters$: Observable<IFilterSettings>;
  items$: Observable<IItem[]>
  categories$: Observable<Set<string>>

  constructor(
    ngRedux: NgRedux<IAppState>
  ) { 
    //TODO: when new filters, need to apply to items
    this.filters$ = ngRedux.select<IFilterSettings>('filters');
    //TODO: when new items, need to apply filters
    const itemsObservable: Observable<IItemsRef> = ngRedux.select<IItemsRef>(['itemList', 'items']);

    this.items$ = itemsObservable.map( items => Object.keys(items).map( key => items[key] ) );

    this.categories$ = itemsObservable.map( items => {
      const unflattenedCategories = Object.keys(items).map( key => items[key].categories )

      const categoriesArray: string[] = [].concat(...unflattenedCategories);

      return new Set(categoriesArray);
    });
    // this.categories = this.filters.
  
  }

  applyRatingFilter(e) {
    console.log(e); //TODO: wire this slider
  }

}
