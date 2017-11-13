import { AnyAction, Store } from "redux";
import { Observable } from "rxjs/Observable";
import { ofType } from 'redux-observable';
import { ItemsActions } from "../actions/items.actions";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Inject } from "@angular/core";
import { AppService } from "../services/app.service";

export const getItemsEpic = (action$: Observable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(ItemsActions.GET_DEFAULT_ITEMS)
        .do( (action: AnyAction) => console.log('Epic sees action: ', action.type) )
        .do( () => {
            let appService: AppService;
            @Inject('AppService') appService;
            appService.getAllItems().map( itemsRef => Object.keys(itemsRef) ).subscribe( name => { console.log(name)});
        })
        .map(() => <AnyAction>{type: ''});