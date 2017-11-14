import { IItemsRef, IItem } from '../models/items.model';
import { IFilterSetting, IFilterSettings } from '../models/filters.model';

export const filterComperatorEnum = {
    'GREATER_THAN':             'greaterThan',
    'GREATER_THAN_OR_EQUAL':    'greaterThanOrEqual',
    'LESS_THAN':                'lessThan',
    'LESS_THAN_OR_EQUAL':       'lessThanOrEqual',
    'EQUAL':                    'equal',
    'LIST_HAS':                 'listHas',
}

export const is = (a: any): Object => {
    return {
        [filterComperatorEnum.GREATER_THAN]:            (b: any): boolean => a > b,
        [filterComperatorEnum.GREATER_THAN_OR_EQUAL]:   (b: any): boolean => a >= b,
        [filterComperatorEnum.LESS_THAN]:               (b: any): boolean => a < b,
        [filterComperatorEnum.LESS_THAN_OR_EQUAL]:      (b: any): boolean => a <= b,
        [filterComperatorEnum.EQUAL]:                   (b: any): boolean => a === b,
        [filterComperatorEnum.LIST_HAS]:                (b: any): boolean => a.indexOf(b) !== -1,
    };
};

export const filterItems = (items: IItemsRef, filterSettings: IFilterSettings): IItemsRef => {
    let filteredItems = {...items};
    //apply filter to each item
    Object.keys(filterSettings).forEach( key => {
        const filter: IFilterSetting = filterSettings[key];
        //filter out the keys in filteredItems using the filterSetting
        let filteredKeys = Object.keys(filteredItems)
            .filter( key => {
                if (filteredItems[key] !== null ) {
                    is(filteredItems[key][filter.name])[filter.comperator](filter.value);
                }
                return true; //don't filter if no value in item property.
            });

        //craete a new filteredItems with the new filtered keys
        filteredItems = {};
        filteredKeys.forEach( key =>  filteredItems[key] = items[key]);
    });

    return filteredItems;
}

