
import { Component, OnInit }  from '@angular/core';
import { NgRedux }            from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';

import { IAppState }                        from '../../models/app.model';
import { IFilterSettings, IFilterSetting }  from '../../models/filters.model';
import { IItemsRef, IItem }                 from '../../models/items.model';

import { filterItems, filterComperatorEnum } from '../../helpers/filter-items.helper';

import { FilterActions } from '../../actions/filter.actions';


@Component({
  selector: 'items-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filters$: Observable<IFilterSettings>;
  // items$: Observable<IItem[]>;
  categories$: Observable<Set<string>>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private filterActions: FilterActions,
  ) { 
    //TODO: when new filters, need to apply to items
    this.filters$ = ngRedux.select<IFilterSettings>('filters');
    //TODO: when new items, need to apply filters
    const itemsObservable: Observable<IItemsRef> = ngRedux.select<IItemsRef>(['itemList', 'items']);

    //apply filters from filter stream to items in item stream and convert to an array.
    // this.items$ = itemsObservable
    //   .withLatestFrom(this.filters$, (items: IItemsRef, filters: IFilterSettings) => filterItems(items, filters) )
    //   .map( items => Object.keys(items).map( key => items[key] ) );
      

    //use the stream from items to derive the categories for filtering.
    this.categories$ = itemsObservable.map( items => {
      const unflattenedCategories = Object.keys(items).map( key => items[key].categories );

      const categoriesArray: string[] = [].concat(...unflattenedCategories);

      return new Set(categoriesArray);
    });
  
  }

  applyRatingFilter(minRating): void {
    const filter: IFilterSetting = { name: 'rating', comperator: filterComperatorEnum.GREATER_THAN_OR_EQUAL, value: minRating };
    this.ngRedux.dispatch( this.filterActions.setFilter(filter) );
  }


}
