import { Inject, Injectable } from "@angular/core";

import { AnyAction, Store, Action } from "redux";
import { ofType } from 'redux-observable';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ItemsActions } from "../actions/items.actions";
import { AppService } from "../services/app.service";
import { IItemsRef } from "../models/items.model";


@Injectable()
export class GetItemsEpic {
    constructor(
        private appService: AppService,
        private itemsActions: ItemsActions
    ) {}

    getDefaultItems = (action$: Observable<AnyAction>): Observable<AnyAction> => {
        return action$.ofType(ItemsActions.GET_DEFAULT_ITEMS)
            .do( (action: AnyAction) => console.log('Epic sees action: ', action.type) )
            .mergeMap( () => this.appService.getAllItems() )
            .map((items:IItemsRef) => this.itemsActions.recievedDefaultItems(items, Date.now()) );
    }
    
}