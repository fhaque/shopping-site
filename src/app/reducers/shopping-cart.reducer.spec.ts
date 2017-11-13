import { ShoppingCartActions }  from '../actions/shopping-cart.actions';
import { shoppingCart }         from '../reducers/shopping-cart.reducer';

const shoppingCartActions = new ShoppingCartActions();

describe('Shopping Cart Reducer', () => {
    beforeEach(() => {
        this.beforeState = {'56a': 1};
    });

    it('should add new item with ADD_ITEM_TO_CART action', () => {
        const id = '3c';
        const action = shoppingCartActions.addItem(id);
        const afterState = {'56a': 1, '3c': 1};

        expect( shoppingCart(this.beforeState, action) ).toEqual( afterState );
    });

    it('should increment for an item in the cart with ADD_ITEM_TO_CART action', () => {
        const id = '56a';
        const action = shoppingCartActions.addItem(id);
        const afterState = {'56a': 2};

        expect( shoppingCart(this.beforeState, action) ).toEqual( afterState );
    });

    it('should remove item with REMOVE_ITEM_FROM_CART action', () => {
        const id = '56a';
        const action = shoppingCartActions.removeItem(id);
        const afterState = {};

        expect( shoppingCart(this.beforeState, action) ).toEqual( afterState );
    });
});