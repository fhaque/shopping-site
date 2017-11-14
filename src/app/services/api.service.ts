import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItemsRef } from '../models/items.model';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ApiService {
    private readonly apiKey = 'nmgk8d5wz7a58bqdts3n3zrk';
    private readonly apiBaseURL = 'https://api.walmartlabs.com/v1/';
    private readonly apiURLTrends = `${this.apiBaseURL}trends?format=json&apiKey=${this.apiKey}`;
    private readonly apiURLSearch = `${this.apiBaseURL}search?format=json&apiKey=${this.apiKey}`;

    constructor(
        private http: HttpClient
    ) {}

    getAllItems() {
        return this.http
            .get(this.apiURLTrends)
            .pipe( catchError( this.handleError('getAllItems', {}) ) );
    }

    getItemsByQuery(searchTerm: string) {
        return this.http
            .get( this.searchUrl(searchTerm) )
            .do( () => console.log('Api Service needs to impolement getItemsByQuery') )
            .pipe( catchError( this.handleError('getItemsByQuery', {}) ) );
    }

    private searchUrl(searchTerm: string) {
        return this.apiURLSearch + `&query=${searchTerm}`;
    }

    //from Angular docs
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    log(message: string) {
        //TODO: create some type of logger
        console.log('API Service:', message);
    }


}