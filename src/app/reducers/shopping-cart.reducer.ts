import { AnyAction } from 'redux';
import { id, IItemCount } from '../models/items.model';
import { ShoppingCartActions } from '../actions/shopping-cart.actions';
import { INITIAL_STATE } from '../store/initial-state';

export const shoppingCart = (state: IItemCount=INITIAL_STATE.shoppingCart, action: AnyAction) => {
    let newState;

    switch(action.type) {
        
        case ShoppingCartActions.ADD_ITEM_TO_CART:
            if (state.hasOwnProperty(action.id)) {
                return {...state, [action.id]: state[action.id] + 1};
            }
            return {...state, [action.id]: 1};
            
        case ShoppingCartActions.REMOVE_ITEM_FROM_CART:
            newState = {...state, [action.id]: state[action.id] - 1};;
            if (newState[action.id] <= 0) {
                delete newState[action.id];
            }
            return newState;
        
        case ShoppingCartActions.SET_ITEM_COUNT_IN_CART:
            newState = {...state};
            if (action.count === 0) {
                delete newState[action.id];
            } else {
                newState[action.id] = action.count;
            }
            return newState;
        default:
            return state;
    }
}