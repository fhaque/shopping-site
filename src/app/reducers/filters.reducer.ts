import { AnyAction } from 'redux';

import { FilterActions } from '../actions/filter.actions';
import { IFilterSettings, IFilterSetting } from '../models/filters.model';
import { INITIAL_STATE } from '../store/initial-state';

export const filters = (state: IFilterSettings = INITIAL_STATE.filters, action: AnyAction): IFilterSettings => {
    switch(action.type) {
        case FilterActions.CLEAR_ALL_FILTERS:
            return [];
        case FilterActions.ADD_FILTER_SETTING:
            return [...state, action.filter];
        case FilterActions.REMOVE_FILTER_SETTING:
            return state.filter( (filter: IFilterSetting) => filter.name !== action.name );
        default:
            return state;
    }
}