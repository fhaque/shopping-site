import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItemsRef } from '../models/items.model';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ApiService {
    private apiURL = 'api/items';
    constructor(
        private http: HttpClient
    ) {}

    getAllItems() {
        return this.http
            .get(this.apiURL)
            .pipe( catchError( this.handleError('getAllItems', {}) ) );
    }

    getItemsByQuery(searchTerm: string) {
        return this.http
            .get(this.apiURL)
            .do( () => console.log('Api Service needs to impolement getItemsByQuery') )
            .pipe( catchError( this.handleError('getItemsByQuery', {}) ) );
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