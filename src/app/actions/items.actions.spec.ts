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

    it('should give an RECIEVED_ITEMS_BY_QUERY action', () => {
        const items = {};
        const recievedOn = Date.now();
        const expectedAction: AnyAction = { type: ItemsActions.RECIEVED_ITEMS_BY_QUERY, items, recievedOn };

        expect( itemsActions.receivedItemsByQuery(items, recievedOn) ).toEqual( expectedAction );
    });

    it('should give an RECIEVED_DEFAULT_ITEMS action', () => {
        const items = {};
        const recievedOn = Date.now();
        const expectedAction: AnyAction = { type: ItemsActions.RECIEVED_DEFAULT_ITEMS, items, recievedOn };

        expect( itemsActions.receivedDefaultItems(items, recievedOn) ).toEqual( expectedAction );
    });

});
