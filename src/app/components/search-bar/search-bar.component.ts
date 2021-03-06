import { Component }  from '@angular/core';
import { Router } from '@angular/router';

import { NgRedux }    from '@angular-redux/store';
import { Subject }    from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged
}                     from 'rxjs/operators';

import { IAppState }            from '../../models/app.model';
import { ItemsActions } from '../../actions/items.actions';
// import { SearchHistoryActions } from '../../actions/search-history.actions';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  readonly searchTerm$: Subject<string>;
  searchTermForSubmit:  string;


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private itemsActions: ItemsActions,
    private router: Router
    // private searchHistoryActions: SearchHistoryActions
  ) { 
    this.searchTerm$ = new Subject<string>();
    this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged());
  }

  handleKeyUp(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  handleSubmit(searchTerm: string) {
    console.log('from submit', searchTerm);

    this.router.navigate(['/search'], { queryParams: {query: searchTerm} });

    // this.ngRedux.dispatch( this.itemsActions.getItemsByQuery(searchTerm) );
    // this.ngRedux.dispatch( this.searchHistoryActions.addSearchTerm(searchTerm, Date.now()) );
    //TODO: add search submit functionality
  }
}
