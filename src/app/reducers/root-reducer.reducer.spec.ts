import { AnyAction } from 'redux';

import { rootReducer }      from '../reducers/root-reducer.reducer';

import { INITIAL_STATE } from '../store/initial-state';
import { ShoppingCartActions }  from '../actions/shopping-cart.actions';

describe('Root Reducer', () => {
    beforeEach(() => {
        this.beforeState = INITIAL_STATE;
    });

    it('should give an ADD_ITEM_TO_CART action', () => {
        const id = '2a';
        const action: AnyAction = { type: ShoppingCartActions.ADD_ITEM_TO_CART, id };
        const afterState = {...INITIAL_STATE, shoppingCart: {'2a': 1}};

        expect( rootReducer(INITIAL_STATE, action) ).toEqual( afterState );
    });
});