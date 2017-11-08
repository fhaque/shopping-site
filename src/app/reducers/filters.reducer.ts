import { AnyAction } from 'redux';

import { FilterActions } from '../actions/filter.actions';
import { IFilterSettings, IFilterSetting } from '../models/filters.model';
import { INITIAL_STATE } from '../store/initial-state';

export const filters = (state: IFilterSettings = INITIAL_STATE.filters, action: AnyAction): IFilterSettings => {
    switch(action.type) {
        case FilterActions.CLEAR_ALL_FILTERS:
            return {};
        // case FilterActions.ADD_FILTER_SETTING:
        //     return {...state, [action.filter.name]: action.filter};
        case FilterActions.REMOVE_FILTER_SETTING:
            const newState = {};
            Object.keys(state).filter(key => key !== action.name).forEach( key => newState[key] = state[key] );
            return newState;
        case FilterActions.SET_FILTER_SETTING:
            return {...state, [action.filter.name]: action.filter};
        default:
            return state;
    }
};