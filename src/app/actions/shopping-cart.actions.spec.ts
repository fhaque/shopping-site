import { AnyAction } from 'redux';
import { ShoppingCartActions }  from '../actions/shopping-cart.actions';

const shoppingCartActions = new ShoppingCartActions();

describe('Shopping Cart Actions', () => {
    it('should give an ADD_ITEM_TO_CART action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: ShoppingCartActions.ADD_ITEM_TO_CART, id };

        expect( shoppingCartActions.addItem(id) ).toEqual( expectedAction );
    });
    it('should give a REMOVE_ITEM_FROM_CART action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: ShoppingCartActions.REMOVE_ITEM_FROM_CART, id };

        expect( shoppingCartActions.removeItem(id) ).toEqual( expectedAction );
    });
});