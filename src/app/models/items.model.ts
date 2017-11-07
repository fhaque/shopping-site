export type id = string;

export interface IItem {
    id: id,
    name: string,
    price: number,
    rating: number,
    photoURL: string,
    categories: string[],
}

export interface IItemsRef {
    [id: string]: IItem
}

export interface IItemList {
    items: IItemsRef,
}

export interface IItemCount {
    [id: string]: number
}