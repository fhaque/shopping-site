import { AnyAction, Store } from "redux";
import { Observable } from "rxjs/Observable";
import { ofType } from 'redux-observable';
import { ItemsActions } from "../actions/items.actions";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

export const getItemsEpic = (action$: Observable<AnyAction>): Observable<AnyAction> =>
    action$.ofType(ItemsActions.GET_DEFAULT_ITEMS)
        .do( (action: AnyAction) => console.log('Epic sees action: ', action.type) )
        .map(() => <AnyAction>{type: ''});