import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AnyAction } from 'redux';

import { ofType, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoginService } from '../services/login.service';
import { UserActions } from '../actions/user.actions';

import { IUser } from '../models/user.model';


@Injectable()
export class UserLoginEpic {
    constructor(
        private loginService: LoginService,
        private userActions: UserActions,
        private router: Router,
    ) { }

    login = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
        return action$.ofType(UserActions.LOGIN_USER_REQUEST)
            .switchMap( (action: AnyAction) =>
                this.loginService.login(action.username, action.pass) 
            )
            .map( (user: IUser) => 
                this.userActions.loginSuccess(user, Date.now()) 
            )
            .do( () => this.router.navigate(['']) )
            .catch((err: Error, caught) =>
                Observable.of( this.userActions.loginFailed(err) )
            )
    };

    logout = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
        return action$.ofType(UserActions.LOGOUT_USER)
            .switchMap( (action: AnyAction) => {
                this.loginService.logout();
                return ActionsObservable.empty();
            });
    };
}