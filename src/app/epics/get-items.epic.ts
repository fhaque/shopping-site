import { Inject, Injectable } from "@angular/core";

import { AnyAction, Store, Action } from "redux";
import { ofType } from 'redux-observable';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

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
            .mergeMap( () => this.appService.getTrendingItems() )
            .map((items:IItemsRef) => this.itemsActions.recievedDefaultItems(items, Date.now()) );
    }

    getItemsByQuery = (action$): Observable<AnyAction> => {
        const queryAndItems$: Observable<[string, IItemsRef]> = action$
            .ofType(ItemsActions.GET_ITEMS_BY_QUERY)
            .map( (action: AnyAction) => action.query )
            .switchMap( (query: string) => 
                this.appService.getItemsByQuery(query).map( (items: IItemsRef) => [query, items] ) 
            );
    
        const recievedItemsByQueryAction$: Observable<AnyAction> = queryAndItems$
            .map( (queryAndItems:[string, IItemsRef]) => 
                this.itemsActions.recievedItemsByQuery(queryAndItems[1], Date.now())
            );
    
        // Save Search History term after the appService retrieved data.
        const searchHistoryAction$: Observable<AnyAction> = queryAndItems$
            .map( (queryAndItems:[string, IItemsRef]) => 
                this.searchHistoryActions.addSearchTerm(queryAndItems[0], Date.now())
            );

        return Observable.merge(recievedItemsByQueryAction$, searchHistoryAction$);
    }
    
}