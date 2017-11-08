import { IItemList, IItemCount, id } from './items.model';
import { IFilterSettings } from '../models/filters.model';
import { ISearchHistory }   from '../models/search-history.model';

export interface IAppState {
    itemList: IItemList,
    displayItems: id[],
    shoppingCart: IItemCount,
    filters: IFilterSettings,
    searchHistory: ISearchHistory,
}