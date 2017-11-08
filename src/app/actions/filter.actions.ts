import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';
import { IFilterSetting } from '../models/filters.model';

@Injectable()
export class FilterActions {
    // static readonly ADD_FILTER_SETTING = 'ADD_FILTER_SETTING';
    static readonly REMOVE_FILTER_SETTING = 'REMOVE_FILTER_SETTINGS';
    static readonly CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS';
    static readonly SET_FILTER_SETTING = 'SET_FILTER_SETTING';

    clearFilters(): AnyAction {
        return { type: FilterActions.CLEAR_ALL_FILTERS };
    }

    // addFilter(filter: IFilterSetting): AnyAction {
    //     return { type: FilterActions.ADD_FILTER_SETTING, filter };
    // }

    removeFilter(name: string): AnyAction {
        return { type: FilterActions.REMOVE_FILTER_SETTING, name };
    }

    setFilter(filter: IFilterSetting): AnyAction {
        return { type: FilterActions.SET_FILTER_SETTING, filter };
    }
}