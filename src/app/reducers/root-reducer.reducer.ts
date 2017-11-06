import { combineReducers } from 'redux';

import { shoppingCart } from './shopping-cart.reducer';
import { displayItems } from './display-items.reducer';
import { itemList } from './item-list.reducer';

export const rootReducer = combineReducers({itemList, displayItems, shoppingCart});