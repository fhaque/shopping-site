import { Injectable }   from '@angular/core';
import { AnyAction }    from 'redux';

@Injectable()
export class SearchHistoryActions {
    static readonly ADD_TO_SEARCH_HISTORY = 'ADD_TO_SEARCH_HISTORY';

    addSearchTerm(searchTerm:string, date:number): AnyAction {
        return { type: SearchHistoryActions.ADD_TO_SEARCH_HISTORY, searchTerm, date };
    }
}