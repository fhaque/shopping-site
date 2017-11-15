import { ApiService } from "./api.service";
import { TransformDataHelper } from "./transform-data.helper";
import { Injectable } from "@angular/core";
import { IItemsRef } from "../models/items.model";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AppService {
    constructor(
        private apiService: ApiService,
        private transformService: TransformDataHelper
    ) {}

    getTrendingItems(): Observable<IItemsRef> {
        return this.apiService
            .getTrendingItems()
            .map( this.transformService.toItems );
    }

    getItemsByQuery(searchTerm: string): Observable<IItemsRef> {
        return this.apiService
            .getItemsByQuery(searchTerm)
            .map( this.transformService.toItems );
    }

    getItem(id: string) {
        return this.apiService
            .getItem(id)
            .map( this.transformService.toItem );
    }
}