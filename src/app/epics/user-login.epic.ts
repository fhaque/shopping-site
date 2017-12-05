import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { UserActions } from '../actions/user.actions';
import { IUser } from '../models/user.model';

@Injectable()
export class UserLoginEpic {
    constructor(
        private loginService: LoginService,
        private userActions: UserActions
    ) { }

    login = (action$): Observable<AnyAction> => {
        return action$.ofType(UserActions.LOGIN_USER_REQUEST)
            .switchMap( (action: AnyAction) => 
                this.loginService.login(action.username, action.pass) 
            )
            .map( (user: IUser) => this.userActions.loginSuccess(user, Date.now()) )
            .catch((err: Error) => {
                console.error('User Login: ', err.message);
                return this.userActions.loginFailed(err);
            });
    }

    
}