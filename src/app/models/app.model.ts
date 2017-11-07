import { IItemList, IItemCount, id } from './items.model';

export interface IAppState {
    itemList: IItemList,
    displayItems: id[],
    shoppingCart: IItemCount,
}