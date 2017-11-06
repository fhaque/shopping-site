import { AnyAction, applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';

import {
    id,
    IItem,
    IItemsRef,
    IItemList
} from '../models/items.model';

import { IAppState } from '../models/app.model';
import { rootReducer } from '../reducers/root-reducer.reducer';
import { INITIAL_STATE } from './initial-state';

export const store = createStore<IAppState>(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(logger)
);