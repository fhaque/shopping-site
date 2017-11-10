import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app.model';
import { Observable } from 'rxjs/Observable';
import { ISearchHistory } from '../../models/search-history.model';

@Component({
  selector: 'search-history-list',
  templateUrl: './search-history-list.component.html',
  styleUrls: ['./search-history-list.component.css']
})
export class SearchHistoryListComponent {
  private readonly searchHistory: Observable<ISearchHistory>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { 
    this.searchHistory = this.ngRedux.select<ISearchHistory>('searchHistory');
  }

}
