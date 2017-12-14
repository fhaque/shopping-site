import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AnyAction } from 'redux';

import { ofType, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/ignoreElements';

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
            // Lesson: For graceful error handling without disupting the action
            // stream, catch the error directly as possible (right after loginservice)
            // and then transform the error to something else and add that to the
            // action stream.
                this.loginService.login(action.username, action.pass)
                    .map((val: IUser) =>
                        this.userActions.loginSuccess(val, Date.now())
                    )
                    .catch((err: Error) =>
                        Observable.of( this.userActions.loginFailed(err) )
                    )
            );
    }

    logout = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
        return action$.ofType(UserActions.LOGOUT_USER)
            .do( () => this.loginService.logout() )
            .ignoreElements();
    }

    loginSuccess = (action$: ActionsObservable<AnyAction>): Observable<AnyAction> => {
        return action$.ofType(UserActions.LOGIN_USER_SUCCESS)
            .do( () => this.router.navigate(['']) )
            .ignoreElements();
    }
}
