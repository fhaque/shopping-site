
import { Component, OnInit }  from '@angular/core';
import { NgRedux }            from '@angular-redux/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

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
export class FilterComponent implements OnInit {
  filters$: Observable<IFilterSettings>;
  categories$: Observable<Set<string>>;
  selectedCategory$: Observable<string>;
  minRating$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private filterActions: FilterActions,
  ) { }

  ngOnInit() {
    const itemsObservable: Observable<IItemsRef> = this.ngRedux.select<IItemsRef>(['itemList', 'items']);
    this.filters$ = this.ngRedux.select<IFilterSettings>('filters').distinctUntilChanged();
    
    //use the stream from items to derive the categories for filtering.
    this.categories$ = itemsObservable.map( items => {
      const unflattenedCategories = Object.keys(items).map( key => items[key].categories );
      const categoriesArray: string[] = [].concat(...unflattenedCategories);

      return new Set(categoriesArray);
    });
    
    this.selectedCategory$ = this.filters$.map( filters => (filters.hasOwnProperty('categories')) ? filters.categories.value : null );
    this.minRating$ = this.filters$.map(filters => (filters.hasOwnProperty('rating')) ? filters.rating.value : 1 );

  }

  applyRatingFilter(minRating: number): void {
    const filter:IFilterSetting = { name: 'rating', comperator: filterComperatorEnum.GREATER_THAN_OR_EQUAL, value: +minRating };
    this.ngRedux.dispatch( this.filterActions.setFilter(filter) );
  }

  applyCategoriesFilter(category: string): void {
    const filter:IFilterSetting = { name: 'categories', comperator: filterComperatorEnum.LIST_HAS, value: category };
    this.ngRedux.dispatch( this.filterActions.setFilter(filter) );
  }

  clearFilters(): void {
    this.ngRedux.dispatch( this.filterActions.clearFilters() );
  }


}
