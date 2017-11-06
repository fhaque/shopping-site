import { AnyAction } from 'redux';
import { id } from '../models/items.model';

export class DisplayItemsActions {
    static readonly ADD_ITEM_TO_DISPLAY = 'ADD_ITEM_TO_DISPLAY';
    static readonly REMOVE_ITEM_FROM_DISPLAY = 'REMOVE_ITEM_FROM_DISPLAY';

    addItem(id: id): AnyAction {
        return {type: DisplayItemsActions.ADD_ITEM_TO_DISPLAY, id };
    }

    removeItem(id: id): AnyAction {
        return {type: DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY, id };
    }
}