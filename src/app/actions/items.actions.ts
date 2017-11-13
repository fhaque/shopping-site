import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';
import { IItemsRef } from '../models/items.model';

@Injectable()
export class ItemsActions {
    static readonly GET_ITEMS_BY_QUERY = 'GET_ITEMS_BY_QUERY';
    static readonly RECIEVED_ITEMS_BY_QUERY = 'RECIEVED_ITEMS_BY_QUERY';
    static readonly GET_DEFAULT_ITEMS = 'GET_DEFAULT_ITEMS';
    static readonly RECIEVED_DEFAULT_ITEMS = 'RECIEVED_DEFAULT_ITEMS';

    getDefaultItems(): AnyAction {
        return { type: ItemsActions.GET_DEFAULT_ITEMS };
    }

    getItemsByQuery(query: string): AnyAction {
        return { type: ItemsActions.GET_ITEMS_BY_QUERY, query };
    }

    recievedDefaultItems(items: IItemsRef, recievedOn: number): AnyAction {
        return { type: ItemsActions.RECIEVED_DEFAULT_ITEMS, items, recievedOn };
    }

    recievedItemsByQuery(items: IItemsRef, recievedOn: number): AnyAction {
        return { type: ItemsActions.GET_ITEMS_BY_QUERY, items, recievedOn };
    }
}