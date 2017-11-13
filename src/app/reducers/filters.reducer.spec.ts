import { FilterActions }    from '../actions/filter.actions';
import { filters }          from '../reducers/filters.reducer';

import { IFilterSetting, IFilterSettings } from '../models/filters.model';

describe('Filters reducer', () => {
    beforeEach( () => {
        this.beforeState = <IFilterSettings>{
            'categories':   { name: 'categories', comperator: 'listHas', value: 'home' },
            'rating':       { name: 'rating', comperator: 'greaterThan', value: 2 },
        };  
    });
    it('should clear all filters with CLEAR_ALL_FILTERS action', () => {
        const action = { type: FilterActions.CLEAR_ALL_FILTERS };
        const afterState = {};

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
    it('should clear all filters with ADD_FILTER_SETTING action', () => {
        const filter = { name: 'price', comperator: 'greaterThan', value: 3 };
        const action = { type: FilterActions.SET_FILTER_SETTING, filter };
        const afterState = {...this.beforeState, [filter.name]: filter };

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
    it('should clear all filters with REMOVE_FILTER_SETTING action', () => {
        const name = 'categories';
        const action = { type: FilterActions.REMOVE_FILTER_SETTING, name };
        const afterState = {'rating': { name: 'rating', comperator: 'greaterThan', value: 2 } };

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
});