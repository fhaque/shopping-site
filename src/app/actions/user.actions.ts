import { Injectable } from "@angular/core";
import { AnyAction } from 'redux';

@Injectable()
export class UserActions {
    static readonly LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
    static readonly LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
    static readonly LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

    static readonly LOGOUT_USER = 'LOGOUT_USER';

    loginStarted(username: string, pass: string): AnyAction {
        return { type: UserActions.LOGIN_USER_REQUEST, username, pass };
    }

    loginSuccess(user, loggedInOn: number): AnyAction {
        return { type: UserActions.LOGIN_USER_SUCCESS, user, loggedInOn };
    }

    loginFailed(error: Error): AnyAction {
        return { type: UserActions.LOGIN_USER_FAIL, error };
    }

    logout(): AnyAction {
        return { type: UserActions.LOGOUT_USER };
    }
}