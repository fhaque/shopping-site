import { AnyAction } from 'redux';

import { IItemList } from '../models/items.model';
import { ItemsActions } from '../actions/items.actions';
import { INITIAL_STATE } from '../store/initial-state';
import { fakeItemsData } from '../../api/fake-items-data';

export const itemList = (state: IItemList=INITIAL_STATE.itemList, action: AnyAction): IItemList => {
    switch(action.type) {
        case ItemsActions.GET_DEFAULT_ITEMS:
            return {...state, gettingData: true };
        case ItemsActions.GET_ITEMS_BY_QUERY:
            return {...state, items: {}, gettingData: true };  //TODO: implement
        case ItemsActions.RECIEVED_DEFAULT_ITEMS:
            return {
                ...state, 
                gettingData: false, 
                items: action.items, 
                recievedOn: action.recievedOn
            };
        case ItemsActions.RECIEVED_ITEMS_BY_QUERY:
            return {
                ...state, 
                gettingData: false, 
                items: action.items, 
                recievedOn: action.recievedOn
            };
        default:
            return state;
    }
}