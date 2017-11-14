import { Inject, Injectable } from "@angular/core";

import { AnyAction, Store, Action } from "redux";
import { ofType } from 'redux-observable';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ItemsActions } from "../actions/items.actions";
import { AppService } from "../services/app.service";
import { IItemsRef } from "../models/items.model";
import { SearchHistoryActions } from "../actions/search-history.actions";


@Injectable()
export class GetItemsEpic {
    constructor(
        private appService: AppService,
        private itemsActions: ItemsActions,
        private searchHistoryActions: SearchHistoryActions,
    ) {}

    getDefaultItems = (action$): Observable<AnyAction> => {
        return action$.ofType(ItemsActions.GET_DEFAULT_ITEMS)
            .do( (action: AnyAction) => console.log('Epic sees action: ', action.type) )
            .mergeMap( () => this.appService.getAllItems() )
            .map((items:IItemsRef) => this.itemsActions.recievedDefaultItems(items, Date.now()) );
    }

    getItemsByQuery = (action$): Observable<AnyAction> => {
        const query$: Observable<string> = action$.ofType(ItemsActions.GET_ITEMS_BY_QUERY)
            .do( (action: AnyAction) =>  console.log('Epic sees action: ', action.type) )
            .map( (action: AnyAction) => action.query );

        const items$ = query$.mergeMap( query => this.appService.getItemsByQuery(query) );

        // Save Search History term after the appService retrieved data.
        return Observable.zip(query$, items$, (query: string, items:IItemsRef) =>
            this.searchHistoryActions.addSearchTerm(query, Date.now())
        );
    }
    
}