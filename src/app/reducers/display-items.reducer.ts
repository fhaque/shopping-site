import { AnyAction } from 'redux';

import { id } from '../models/items.model';
import { DisplayItemsActions } from '../actions/display-items.actions';
import { INITIAL_STATE } from '../store/initial-state';

export const displayItems = (state: id[]=INITIAL_STATE.displayItems, action: AnyAction) => {
    switch(action.type) {
        case DisplayItemsActions.ADD_ITEM_TO_DISPLAY:
            return [...state, action.id];
        case DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY:
            return state.filter( item => item !== action.id );
        default:
            return state;
    }
}