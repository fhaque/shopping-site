import { DisplayItemsActions } from './store';
import { AnyAction } from 'redux';

const displayItemsActions = new DisplayItemsActions();

describe('Display Items Actions', () => {
    it('should give an add item to display action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.ADD_ITEM_TO_DISPLAY, id };

        expect( displayItemsActions.addItem(id) ).toEqual( expectedAction );
    });
    it('should give a remove item from display action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY, id };

        expect( displayItemsActions.removeItem(id) ).toEqual( expectedAction );
    });
});