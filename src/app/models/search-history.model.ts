export interface ISearchHistoryItem {
    searchTerm: string,
    date: number
}

export interface ISearchHistory extends Array<ISearchHistoryItem> {}