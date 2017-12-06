import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { IUser } from '../models/user.model';

interface ITokenObj {
    username: string,
    expiredAt: number,
}

@Injectable()
export class LoginService {
    private token: string = null;

    login(username: string, pass: string): Observable<IUser> {
        if (username === "cheese" && pass === "cheese") {
            const tokenObj: ITokenObj = { 
                username: "cheese", 
                expiredAt: 10 * Date.now()  
            };
            this.token = JSON.stringify(tokenObj);

            //TODO: Add local storage

            const user: IUser = {
                name: username,
            }

            return Observable.of( user );
        }
        
        return Observable.throw( new Error('User Login Fail') );
    }

    logout() {
        this.token = null;
    }

    isLoggedIn(): boolean {
        return (this.token) ? true : false;
    }
}