import { Injectable } from '@angular/core';

import { IItemsRef, IItem } from "../models/items.model";

export interface ITransformDataHelper {
    toItems: (x: any) => IItemsRef ,
    toItem: (x: IResponseItem) => IItem,
}

interface IResponseItem {
    itemId: number,
    name: string,
    salePrice: number,
    customerRating: string,
    categoryPath: string,
    mediumImage: string,
    shortDescription: string,
}

@Injectable()
export class TransformDataHelper implements ITransformDataHelper {
    constructor() {
    }

    toItems = (x: any): IItemsRef => {
        let items:IItemsRef = {};
        x.items && x.items.map( (item:IResponseItem) => {
            items[item.itemId.toString()] = this.toItem(item);
        });
        return items;
    }

    toItem = (item: IResponseItem): IItem => {
        return {
            id: item.itemId.toString() || Date.now().toString(),
            name: item.name || 'Item',
            price: item.salePrice || 0,
            rating: parseFloat(item.customerRating) || null,
            categories: item.categoryPath.split('/'),
            photoURL: item.mediumImage || '',
            description: item.shortDescription || '',
        };
    }
}