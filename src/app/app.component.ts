import { Component } from '@angular/core';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from './models/app.model';
import { ItemsActions } from './actions/items.actions';
import { AppService } from './services/app.service';
import { IItemsRef } from './models/items.model';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: ItemsActions,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.ngRedux.dispatch( this.actions.getDefaultItems() );
  }
}
