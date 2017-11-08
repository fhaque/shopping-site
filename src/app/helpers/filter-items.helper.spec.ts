import { filterItems } from './filter-items.helper';
import { IFilterSettings } from '../models/filters.model'
import { IItemsRef, IItem } from '../models/items.model';
import { fakeItemsData } from '../../api/fake-items-data';

describe('filterItems helper function', () => {
    it('should filter based on category of item', () => {
        const filterSettings: IFilterSettings = { 'categories': {name: 'categories', comperator: 'listHas', value: 'home'} };
        const filteredItems: IItemsRef = { 
            '0': {
                id: '0',
                name: 'Couch',
                price: 99.99,
                rating: 2,
                photoURL: null,
                categories: ['furniture', 'decor', 'home']
            },
            '6cb': {
                id: '6cb',
                name: 'Candle',
                price: 0.99,
                rating: 5,
                photoURL: null,
                categories: ['scents', 'decorations', 'home']
            },
        };
        
        expect( filterItems(fakeItemsData, filterSettings) ).toEqual( filteredItems );
    });

    it('should filter minimum rating of item', () => {
        const filterSettings: IFilterSettings = { 'rating': {name: 'rating', comperator: 'greaterThan', value: 2} };
        const filteredItems: IItemsRef = { 
            '8ch': {
                id: '8ch',
                name: 'TV',
                price: 10.99,
                rating: 3,
                photoURL: null,
                categories: ['appliance', 'electronics']
            },
            '6cb': {
                id: '6cb',
                name: 'Candle',
                price: 0.99,
                rating: 5,
                photoURL: null,
                categories: ['scents', 'decorations', 'home']
            },
        };
        
        expect( filterItems(fakeItemsData, filterSettings) ).toEqual( filteredItems );
    });

    it('should compose filter settings', () => {
        const filterSettings: IFilterSettings = {
            'rating':       {name: 'rating', comperator: 'greaterThan', value: 2},
            'categories':   {name: 'categories', comperator: 'listHas', value: 'home'},
        };
        const filteredItems: IItemsRef = { 
            '6cb': {
                id: '6cb',
                name: 'Candle',
                price: 0.99,
                rating: 5,
                photoURL: null,
                categories: ['scents', 'decorations', 'home']
            },
        };
        
        expect( filterItems(fakeItemsData, filterSettings) ).toEqual( filteredItems );
    });
});