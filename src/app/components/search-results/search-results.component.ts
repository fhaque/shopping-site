import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { ItemsActions } from '../../actions/items.actions';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from '../../models/app.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private itemsActions: ItemsActions,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe( params => this.queryHandle(params.query || '') );
  }

  private queryHandle(query: string) {
    if (query !== '') {
      this.ngRedux.dispatch( this.itemsActions.getItemsByQuery(query) );
    } else {
      this.ngRedux.dispatch( this.itemsActions.getDefaultItems() )
    }
  }

}
