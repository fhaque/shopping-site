import { AnyAction } from 'redux';
import { DisplayItemsActions }  from '../actions/display-items.actions';

const displayItemsActions = new DisplayItemsActions();

describe('Display Items Actions', () => {
    it('should give an ADD_ITEM_TO_DISPLAY action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.ADD_ITEM_TO_DISPLAY, id };

        expect( displayItemsActions.addItem(id) ).toEqual( expectedAction );
    });
    it('should give a REMOVE_ITEM_FROM_DISPLAY action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY, id };

        expect( displayItemsActions.removeItem(id) ).toEqual( expectedAction );
    });
});