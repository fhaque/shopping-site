import { AnyAction } from 'redux';

export class ItemsActions {
    static readonly GET_ITEMS_BY_QUERY = 'GET_ITEMS_BY_QUERY';
    static readonly GET_DEFAULT_ITEMS = 'GET_DEFAULT_ITEMS';

    getDefaultItems(): AnyAction {
        return { type: ItemsActions.GET_DEFAULT_ITEMS };
    }

    getItemsByQuery(query: string): AnyAction {
        return { type: ItemsActions.GET_ITEMS_BY_QUERY, query };
    }
}