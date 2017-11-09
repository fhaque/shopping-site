import { AnyAction }                from 'redux';
import { INITIAL_STATE }            from '../store/initial-state';
import { ISearchHistory }           from '../models/search-history.model';
import { SearchHistoryActions }     from '../actions/search-history.actions';


export const searchHistory = (state:ISearchHistory = INITIAL_STATE.searchHistory, action:AnyAction ): ISearchHistory => {
    switch(action.type) {
        case SearchHistoryActions.ADD_TO_SEARCH_HISTORY:
            return [ ...state, {searchTerm: action.searchTerm, date: action.date} ];
        default:
            return state;
    }
}