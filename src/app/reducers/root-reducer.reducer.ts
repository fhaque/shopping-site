import { combineReducers } from 'redux';

import { IAppState } from '../models/app.model';

import { shoppingCart }     from './shopping-cart.reducer';
import { displayItems }     from './display-items.reducer';
import { itemList }         from './item-list.reducer';
import { filters }          from './filters.reducer';
import { searchHistory }    from './search-history.reducer';
import { currentUserState } from './current-user-state.reducer';

export const rootReducer = combineReducers<IAppState>({itemList, displayItems, shoppingCart, filters, searchHistory, currentUserState});