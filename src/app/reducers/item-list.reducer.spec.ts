import { fakeItemsData } from '../../api/fake-items-data';
import { ItemsActions } from '../actions/items.actions';
import { itemList } from '../reducers/item-list.reducer';
import { IItemList } from '../models/items.model';

const itemsActions = new ItemsActions();

//TODO: write tests after completion of itemList
describe('Item List Reducer', () => {
    it('should retrieve a default items list with GET_DEFAULT_ITEMS action', () => {
        const action = itemsActions.getDefaultItems();
        const afterState:IItemList = { items: {}, recievedOn: 0, gettingData: true };

        expect( itemList(undefined, action) ).toEqual( afterState );
    });
});