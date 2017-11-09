import { Component }  from '@angular/core';
import { NgRedux }    from '@angular-redux/store';
import { Subject }    from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged
}                     from 'rxjs/operators';

import { IAppState }            from '../../models/app.model';
import { SearchHistoryActions } from '../../actions/search-history.actions';

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
    private searchHistoryActions: SearchHistoryActions
  ) { 
    this.searchTerm$ = new Subject<string>();
    this.searchTerm$.pipe(debounceTime(300), distinctUntilChanged());
  }

  handleKeyUp(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  handleSubmit(searchTerm: string) {
    console.log('from submit', searchTerm);
    this.ngRedux.dispatch( this.searchHistoryActions.addSearchTerm(searchTerm, Date.now()) );
    //TODO: add search submit functionality
  }
}
