import { AnyAction } from 'redux';

import { fakeItemsData } from '../../api/fake-items-data';
import { INITIAL_STATE } from '../store/initial-state';

import { ISearchHistory } from '../models/search-history.model';

import { DisplayItemsActions }  from '../actions/display-items.actions';
import { ShoppingCartActions }  from '../actions/shopping-cart.actions';
import { ItemsActions }         from '../actions/items.actions';
import { FilterActions }        from '../actions/filter.actions';
import { SearchHistoryActions } from '../actions/search-history.actions';

import { shoppingCart }     from '../reducers/shopping-cart.reducer';
import { displayItems }     from '../reducers/display-items.reducer';
import { itemList }         from '../reducers/item-list.reducer';
import { filters }          from '../reducers/filters.reducer';
import { searchHistory }    from '../reducers/search-history.reducer';
import { rootReducer }      from '../reducers/root-reducer.reducer';

import { IFilterSetting, IFilterSettings } from '../models/filters.model';


const displayItemsActions = new DisplayItemsActions();
const shoppingCartActions = new ShoppingCartActions();
const itemsActions = new ItemsActions();
const filterActions = new FilterActions();
const searchHistoryActions = new SearchHistoryActions();

describe('Display Items Actions', () => {
    it('should give an ADD_ITEM_TO_DISPLAY action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.ADD_ITEM_TO_DISPLAY, id };

        expect( displayItemsActions.addItem(id) ).toEqual( expectedAction );
    });
    it('should give a REMOVE_ITEM_FROM_DISPLAY action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: DisplayItemsActions.REMOVE_ITEM_FROM_DISPLAY, id };

        expect( displayItemsActions.removeItem(id) ).toEqual( expectedAction );
    });
});

describe('Shopping Cart Actions', () => {
    it('should give an ADD_ITEM_TO_CART action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: ShoppingCartActions.ADD_ITEM_TO_CART, id };

        expect( shoppingCartActions.addItem(id) ).toEqual( expectedAction );
    });
    it('should give a REMOVE_ITEM_FROM_CART action', () => {
        const id = '2a';
        const expectedAction: AnyAction = { type: ShoppingCartActions.REMOVE_ITEM_FROM_CART, id };

        expect( shoppingCartActions.removeItem(id) ).toEqual( expectedAction );
    });
});

describe('Items Actions', () => {
    it('should give an GET_DEFAULT_ITEMS action', () => {
        const expectedAction: AnyAction = { type: ItemsActions.GET_DEFAULT_ITEMS };

        expect( itemsActions.getDefaultItems() ).toEqual( expectedAction );
    });

    it('should give an GET_ITEMS_BY_QUERY action', () => {
        const query = 'cheese';
        const expectedAction: AnyAction = { type: ItemsActions.GET_ITEMS_BY_QUERY, query };

        expect( itemsActions.getItemsByQuery(query) ).toEqual( expectedAction );
    });

});

describe('Filter Actions', () => {
    it('should give an CLEAR_ALL_FILTERS action', () => {
        const expectedAction: AnyAction = { type: FilterActions.CLEAR_ALL_FILTERS };

        expect( filterActions.clearFilters() ).toEqual( expectedAction );
    });

    it('should give an SET_FILTER_SETTING action with a filter setting', () => {
        const filter: IFilterSetting = { name: 'categories', comperator: 'listHas', value: 'home' };
        const expectedAction: AnyAction = { type: FilterActions.SET_FILTER_SETTING, filter };

        expect( filterActions.setFilter(filter) ).toEqual( expectedAction );
    });

    it('should give an REMOVE_FILTER_SETTING action with a filter setting name', () => {
        const name = 'rating';
        const expectedAction: AnyAction = { type: FilterActions.REMOVE_FILTER_SETTING, name };

        expect( filterActions.removeFilter(name) ).toEqual( expectedAction );
    });

});

describe('Search History Actions', () => {
    it('should give an ADD_TO_SEARCH_HISTORY action', () => {
        const searchTerm = 'bananas';
        const date = Date.now();
        const expectedAction: AnyAction = { type: SearchHistoryActions.ADD_TO_SEARCH_HISTORY, searchTerm, date };

        expect( searchHistoryActions.addSearchTerm(searchTerm, date) ).toEqual( expectedAction );
    });
});

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

describe('Display Items Reducer', () => {
    beforeEach(() => {
        this.beforeState = ['56a', '2b'];
    });

    it('should add new item with ADD_ITEM_TO_DISPLAY action', () => {
        const id = '3c';
        const action = displayItemsActions.addItem(id);
        const afterState = [...this.beforeState, id];

        expect( displayItems(this.beforeState, action) ).toEqual( afterState );
    });

    it('should remove item with REMOVE_ITEM_FROM_DISPLAY action', () => {
        const id = '56a';
        const action = displayItemsActions.removeItem(id);
        const afterState = ['2b'];

        expect( displayItems(this.beforeState, action) ).toEqual( afterState );
    });
});

//TODO: write tests after completion of itemList
describe('Item List Reducer', () => {
    it('should retrieve a default items list with GET_DEFAULT_ITEMS action', () => {
        const action = { type: ItemsActions.GET_DEFAULT_ITEMS }
        const afterState = { items: fakeItemsData };

        expect( itemList(undefined, action) ).toEqual( afterState );
    });
});

describe('Filters reducer', () => {
    beforeEach( () => {
        this.beforeState = <IFilterSettings>{
            'categories':   { name: 'categories', comperator: 'listHas', value: 'home' },
            'rating':       { name: 'rating', comperator: 'greaterThan', value: 2 },
        };  
    });
    it('should clear all filters with CLEAR_ALL_FILTERS action', () => {
        const action = { type: FilterActions.CLEAR_ALL_FILTERS };
        const afterState = {};

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
    it('should clear all filters with ADD_FILTER_SETTING action', () => {
        const filter = { name: 'price', comperator: 'greaterThan', value: 3 };
        const action = { type: FilterActions.SET_FILTER_SETTING, filter };
        const afterState = {...this.beforeState, [filter.name]: filter };

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
    it('should clear all filters with REMOVE_FILTER_SETTING action', () => {
        const name = 'categories';
        const action = { type: FilterActions.REMOVE_FILTER_SETTING, name };
        const afterState = {'rating': { name: 'rating', comperator: 'greaterThan', value: 2 } };

        expect( filters(this.beforeState, action) ).toEqual( afterState );
    });
});

describe('Search History Reducer', () => {
    beforeEach( () => {
        this.beforeState = <ISearchHistory>[ 
            { searchTerm:'cows', date: 2 }, 
            { searchTerm:'dogs', date: 3 }, 
        ];
    });
    it('should append new search term to new state', () => {
        const searchTerm = 'bananas';
        const date = Date.now();
        const action = { type: SearchHistoryActions.ADD_TO_SEARCH_HISTORY, searchTerm, date };
        const afterState = <ISearchHistory>[...this.beforeState, {searchTerm, date}];

        expect( searchHistory(this.beforeState, action) ).toEqual( afterState );
    });
});

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