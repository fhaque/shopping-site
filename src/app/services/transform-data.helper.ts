import { Injectable } from '@angular/core';

import { IItemsRef, IItem } from "../models/items.model";

export interface ITransformDataHelper {
    toItems: (x: any) => IItemsRef ,
}

interface IResponseItem {
    itemId: number,
    name: string,
    salePrice: number,
    customerRating: string,
    categoryPath: string,
    mediumImage: string
}

@Injectable()
export class TransformDataHelper implements ITransformDataHelper {
    toItems(x: any): IItemsRef {
        let items:IItemsRef = {};

        x.items && x.items.map( (item:IResponseItem) => {
            items[item.itemId.toString()] = <IItem> {
                id: item.itemId.toString() || Date.now().toString(),
                name: item.name || 'Item',
                price: item.salePrice || 0,
                rating: parseFloat(item.customerRating) || null,
                categories: item.categoryPath.split('/'),
                photoURL: item.mediumImage || '',
            };
        });
        return items;
    }
}