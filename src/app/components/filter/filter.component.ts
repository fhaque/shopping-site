
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../../models/app.model';
import { IFilterSettings } from '../../models/filters.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filters: Observable<IFilterSettings> 

  constructor(
    ngRedux: NgRedux<IAppState>
  ) { 
    this.filters = ngRedux.select<IFilterSettings>('filters');
  }

}
