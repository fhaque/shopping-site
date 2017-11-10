import { Injectable } from '@angular/core';

import { IItemsRef } from "../models/items.model";

export interface ITransformDataHelper {
    toItems: (x: any) => IItemsRef ,
}

@Injectable()
export class TransformDataHelper implements ITransformDataHelper {
    toItems(x: any): IItemsRef {
        return x;
    }
}