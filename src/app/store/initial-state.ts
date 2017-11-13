import { IAppState } from '../models/app.model';

export const INITIAL_STATE: IAppState = {
    itemList: {items:{}, recievedOn: 0, gettingData: false},
    displayItems: [],
    shoppingCart: {},
    filters: {},
    searchHistory: [],
}