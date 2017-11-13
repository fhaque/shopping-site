import { AnyAction } from 'redux';
import { SearchHistoryActions } from '../actions/search-history.actions';

const searchHistoryActions = new SearchHistoryActions();

describe('Search History Actions', () => {
    it('should give an ADD_TO_SEARCH_HISTORY action', () => {
        const searchTerm = 'bananas';
        const date = Date.now();
        const expectedAction: AnyAction = { type: SearchHistoryActions.ADD_TO_SEARCH_HISTORY, searchTerm, date };

        expect( searchHistoryActions.addSearchTerm(searchTerm, date) ).toEqual( expectedAction );
    });
});