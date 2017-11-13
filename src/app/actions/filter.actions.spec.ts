import { AnyAction } from 'redux';

import { FilterActions } from '../actions/filter.actions';
import { IFilterSetting, IFilterSettings } from '../models/filters.model';

const filterActions = new FilterActions();

describe('Filter Actions', () => {
    it('should give an CLEAR_ALL_FILTERS action', () => {
        const expectedAction: AnyAction = { type: FilterActions.CLEAR_ALL_FILTERS };

        expect( filterActions.clearFilters() ).toEqual( expectedAction );
    });

    it('should give an SET_FILTER_SETTING action with a filter setting', () => {
        const filter: IFilterSetting = { name: 'categories', comperator: 'listHas', value: 'home' };
        const expectedAction: AnyAction = { type: FilterActions.SET_FILTER_SETTING, filter };

        expect( filterActions.setFilter(filter) ).toEqual( expectedAction );
    });

    it('should give an REMOVE_FILTER_SETTING action with a filter setting name', () => {
        const name = 'rating';
        const expectedAction: AnyAction = { type: FilterActions.REMOVE_FILTER_SETTING, name };

        expect( filterActions.removeFilter(name) ).toEqual( expectedAction );
    });

});