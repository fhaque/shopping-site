import { IAppState } from '../models/app.model';

export const INITIAL_STATE: IAppState = {
    itemList: {items:{}},
    displayItems: [],
    shoppingCart: {},
    filters: {},
    searchHistory: {}
}