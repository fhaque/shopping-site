import { IItemsRef, IItem } from '../models/items.model';
import { IFilterSetting, IFilterSettings } from '../models/filters.model';

export const is = (a: any): Object => {
    return {
        greaterThan: (b: any): boolean => a > b,
        greaterThanOrEqual: (b: any): boolean => a >= b,
        lessThan: (b: any): boolean => a < b,
        lessThanOrEqual: (b: any): boolean => a <= b,
        equal: (b: any): boolean => a === b,
        listHas: (b: any): boolean => a.indexOf(b) !== -1,
    };
};

export const filterItems = (items: IItemsRef, filterSettings: IFilterSettings): IItemsRef => {
    let filteredItems = {...items};
    //apply filter to each item
    filterSettings.forEach( (filter: IFilterSetting) => {
        //filter out the keys in filteredItems using the filterSetting
        let filteredKeys = Object.keys(filteredItems)
            .filter( key => is(filteredItems[key][filter.name])[filter.comperator](filter.value) );

        //craete a new filteredItems with the new filtered keys
        filteredItems = {};
        filteredKeys.forEach( key =>  filteredItems[key] = items[key]);
    });

    return filteredItems;
}

