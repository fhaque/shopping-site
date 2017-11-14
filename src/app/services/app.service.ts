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

    getAllItems(): Observable<IItemsRef> {
        return this.apiService
            .getAllItems()
            .map( this.transformService.toItems );
    }

    getItemsByQuery(searchTerm: string): Observable<IItemsRef> {
        return this.apiService
            .getItemsByQuery(searchTerm)
            .map( this.transformService.toItems );
    }
}