import { Inject, Injectable } from "@angular/core";

import { AnyAction, Store, Action } from "redux";
import { ofType, ActionsObservable } from 'redux-observable';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { ItemsActions } from "../actions/items.actions";
import { AppService } from "../services/app.service";
import { IItemsRef } from '../models/items.model';
import { SearchHistoryActions } from "../actions/search-history.actions";

@Injectable()
export class GetItemsEpic {
    constructor(
        private appService: AppService,
        private itemsActions: ItemsActions,
        private searchHistoryActions: SearchHistoryActions,
    ) {}

    getDefaultItems =
        (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
            action$.ofType(ItemsActions.GET_DEFAULT_ITEMS)
                .mergeMap( () => this.appService.getTrendingItems() )
                .map((items: IItemsRef) =>
                    this.itemsActions.receivedDefaultItems(items, Date.now()) );

    getItemsByQuery =
        (action$: ActionsObservable<AnyAction>): Observable<AnyAction> =>
            action$
                .ofType(ItemsActions.GET_ITEMS_BY_QUERY)
                .map( (action: AnyAction) => action.query as string)
                .switchMap(
                    query => this.appService.getItemsByQuery(query),
                    (query: string, items: IItemsRef) =>
                        ({ query, items, date: Date.now() })
                )
                .switchMap( ({ query, items, date }) => Observable.from([
                        this.itemsActions.receivedItemsByQuery(items, date),
                        this.searchHistoryActions.addSearchTerm(query, date)
                ]));

}
