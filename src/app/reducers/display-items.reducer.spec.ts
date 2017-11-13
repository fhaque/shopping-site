import { DisplayItemsActions }  from '../actions/display-items.actions';
import { displayItems }         from '../reducers/display-items.reducer';

const displayItemsActions = new DisplayItemsActions();

describe('Display Items Reducer', () => {
    beforeEach(() => {
        this.beforeState = ['56a', '2b'];
    });

    it('should add new item with ADD_ITEM_TO_DISPLAY action', () => {
        const id = '3c';
        const action = displayItemsActions.addItem(id);
        const afterState = [...this.beforeState, id];

        expect( displayItems(this.beforeState, action) ).toEqual( afterState );
    });

    it('should remove item with REMOVE_ITEM_FROM_DISPLAY action', () => {
        const id = '56a';
        const action = displayItemsActions.removeItem(id);
        const afterState = ['2b'];

        expect( displayItems(this.beforeState, action) ).toEqual( afterState );
    });
});