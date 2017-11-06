import { AnyAction, createStore, combineReducers } from 'redux';

export type id = string;

export interface IItem {
    id: id,
    name: string,
    price: number,
    rating: number,
    photoURL: string,
}

export interface IItemsRef {
    [id: string]: IItem
}

export interface IItemList {
    items: IItemsRef,
}

export interface IAppState {
    itemList: IItemList,
    displayItems: id[],
    shoppingCart: id[],
}

export const INITIAL_STATE: IAppState = {
    itemList: {items:{}},
    displayItems: [],
    shoppingCart: [], 
}

export const fakeItemsData: IItemsRef = {
    '0': {
        id: '0',
        name: 'Couch',
        price: 99.99,
        rating: 2,
        photoURL: null
    },
    '8ch': {
        id: '8ch',
        name: 'TV',
        price: 10.99,
        rating: 3,
        photoURL: null
    },
    '6cb': {
        id: '6cb',
        name: 'Candle',
        price: 0.99,
        rating: 5,
        photoURL: null
    },
}

export class DisplayItemsActions {
    static readonly ADD_ITEM_TO_DISPLAY = 'ADD_ITEM_TO_DISPLAY';
    static readonly REMOVE_ITEM_FROM_DISPLAY = 'REMOVE_ITEM_FROM_DISPLAY';

    addItem(id: string): AnyAction {
        return {type: DisplayItemsActions.ADD_ITEM_TO_DISPLAY, id };
    }

    removeItem(id: string): AnyAction {
        return {type: DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY, id };
    }
}

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

export const shoppingCart = (state: id[]=INITIAL_STATE.shoppingCart, action: AnyAction) => {
    switch(action.type) {
        case ShoppingCartActions.ADD_ITEM_TO_CART:
            return [...state, action.id];
        case ShoppingCartActions.REMOVE_ITEM_FROM_CART:
            return state.filter( item => item !== action.id );
        default:
            return state;
    }
}

export const displayItems = (state: id[]=INITIAL_STATE.displayItems, action: AnyAction) => {
    switch(action.type) {
        case DisplayItemsActions.ADD_ITEM_TO_DISPLAY:
            return [...state, action.id];
        case DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY:
            return state.filter( item => item !== action.id );
        default:
            return state;
    }
}

export const itemList = (state: IItemList=INITIAL_STATE.itemList, action: AnyAction) => {
    switch(action.type) {
        case ItemsActions.GET_DEFAULT_ITEMS:
            console.log('GET_DEFAULT_ITEMS needs to be implemented');
            return { items: fakeItemsData }; //TODO: implement
        case ItemsActions.GET_ITEMS_BY_QUERY:
            console.log('GET_ITEMS_BY_QUERY needs to be implemented');
            return { items: fakeItemsData }; //TODO: implement
        default:
            return state;
    }
}

export const rootReducer = combineReducers({itemList, displayItems, shoppingCart});

export const store = createStore(rootReducer, INITIAL_STATE);