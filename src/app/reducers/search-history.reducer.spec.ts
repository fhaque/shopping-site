import { SearchHistoryActions } from "../actions/search-history.actions";
import { searchHistory } from "./search-history.reducer";
import { ISearchHistory } from '../models/search-history.model';

const searchHistoryActions = new SearchHistoryActions();

describe('Search History Reducer', () => {
    beforeEach( () => {
        this.beforeState = <ISearchHistory>[ 
            { searchTerm:'cows', date: 2 }, 
            { searchTerm:'dogs', date: 3 }, 
        ];
    });
    it('should append new search term to new state', () => {
        const searchTerm = 'bananas';
        const date = Date.now();
        const action = { type: SearchHistoryActions.ADD_TO_SEARCH_HISTORY, searchTerm, date };
        const afterState = <ISearchHistory>[...this.beforeState, {searchTerm, date}];

        expect( searchHistory(this.beforeState, action) ).toEqual( afterState );
    });
});