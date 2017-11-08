export interface IFilterSetting {
    name: string,
    comperator: string,
    value: any,
}

export type IFilterSettings = { [name: string]: IFilterSetting };