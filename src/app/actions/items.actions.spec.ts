import { AnyAction } from 'redux';
import { ItemsActions } from '../actions/items.actions';

const itemsActions = new ItemsActions();

describe('Items Actions', () => {
    it('should give an GET_DEFAULT_ITEMS action', () => {
        const expectedAction: AnyAction = { type: ItemsActions.GET_DEFAULT_ITEMS };

        expect( itemsActions.getDefaultItems() ).toEqual( expectedAction );
    });

    it('should give an GET_ITEMS_BY_QUERY action', () => {
        const query = 'cheese';
        const expectedAction: AnyAction = { type: ItemsActions.GET_ITEMS_BY_QUERY, query };

        expect( itemsActions.getItemsByQuery(query) ).toEqual( expectedAction );
    });

});