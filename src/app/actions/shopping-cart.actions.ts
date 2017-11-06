import { AnyAction } from 'redux';

export class ShoppingCartActions {
    static readonly ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
    static readonly REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

    addItem(id: string): AnyAction {
        return { type: ShoppingCartActions.ADD_ITEM_TO_CART, id };
    }

    removeItem(id: string): AnyAction {
        return { type: ShoppingCartActions.REMOVE_ITEM_FROM_CART, id };
    }
}