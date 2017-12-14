import { AnyAction } from 'redux';
import { IUser } from '../models/user.model';
import { UserActions } from './user.actions';

describe('User Actions', () => {
    beforeEach(()=> {
        this.userActions = new UserActions();
    });

    it('should give an LOGIN_USER_REQUEST action', () => {
        const username = 'bob';
        const pass = 'cheese';
        const expectedAction: AnyAction = {
            type: UserActions.LOGIN_USER_REQUEST,
            username,
            pass,
        };

        expect( this.userActions.loginStarted(username, pass) )
            .toEqual( expectedAction );
    });
    it('should give a LOGIN_USER_SUCCESS action', () => {
        const user: IUser = {
            name: 'bob'
        };
        const loggedInOn = Date.now();

        const expectedAction: AnyAction = {
            type: UserActions.LOGIN_USER_SUCCESS,
            user,
            loggedInOn
        };

        expect( this.userActions.loginSuccess(user, loggedInOn) )
            .toEqual( expectedAction );
    });
    it('should give a LOGIN_USER_FAIL action', () => {
        const error: any = { message: 'FAIL!!!' };
        const expectedAction: AnyAction = {
            type: UserActions.LOGIN_USER_FAIL,
            error,
        };

        expect( this.userActions.loginFailed(error) ).toEqual( expectedAction );
    });
    it('should give a LOGOUT_USER action', () => {
        const expectedAction: AnyAction = { type: UserActions.LOGOUT_USER };

        expect( this.userActions.logout() ).toEqual( expectedAction );
    });
});
