import { IItemsRef } from '../app/models/items.model';

export const fakeItemsData: IItemsRef = {
    '0': {
        id: '0',
        name: 'Couch',
        price: 99.99,
        rating: 2,
        photoURL: null,
        categories: ['furniture', 'decor', 'home']
    },
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
}