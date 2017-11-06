import { AnyAction } from 'redux';
import { id } from '../models/items.model';
import { ShoppingCartActions } from '../actions/shopping-cart.actions';
import { INITIAL_STATE } from '../store/initial-state';

export const shoppingCart = (state: id[]=INITIAL_STATE.shoppingCart, action: AnyAction) => {
    switch(action.type) {
        case ShoppingCartActions.ADD_ITEM_TO_CART:
            return [...state, action.id];
        case ShoppingCartActions.REMOVE_ITEM_FROM_CART:
            return state.filter( item => item !== action.id );
        default:
            return state;
    }
}