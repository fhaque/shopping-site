import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable()
export class ShoppingCartActions {
    static readonly ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
    static readonly REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
    static readonly SET_ITEM_COUNT_IN_CART = 'SET_ITEM_COUNT_IN_CART'; 

    addItem(id: string): AnyAction {
        return { type: ShoppingCartActions.ADD_ITEM_TO_CART, id };
    }

    removeItem(id: string): AnyAction {
        return { type: ShoppingCartActions.REMOVE_ITEM_FROM_CART, id };
    }

    setItemCount(id: string, count: number) : AnyAction {
        return { type: ShoppingCartActions.SET_ITEM_COUNT_IN_CART, id, count };
    }
}