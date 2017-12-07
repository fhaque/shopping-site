import { UserLoginEpic } from './user-login.epic';
import { ofType, ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AnyAction } from 'redux';
import { IUser } from '../models/user.model';
import { UserActions } from '../actions/user.actions';

let mockUser: IUser = { name: 'MOCK_user' };

class MockLoginService {
    login = (username, pass) => {};

    logout = () => {};
};
// TODO: Don't feel confident in the testing of Observables.
// TODO: Needs to be updated since Login Service has changed its error handle.
//      And because there is now a Router dependency
class MockUserActions {
    loginSuccess = (user, date) => ({ type: 'MOCK_LOGIN_SUCCESS', user, date });
    loginFailed = (err) => ({ type: 'MOCK_LOGIN_ERROR', err });
};

class MockRouter {
    router = {
        navigate: (commands, extras) => {},
    };
}


describe('UserLoginEpic', () => {
    let mockUserActions: MockUserActions;
    let mockLoginService: MockLoginService;
    let mockRouter: MockRouter;
    let userLoginEpic: UserLoginEpic;
    let action$: any;

    

    describe('login', () => {
        beforeEach(() => {
            mockLoginService = new MockLoginService();
            mockUserActions = new MockUserActions();
            mockRouter = new MockRouter();
            userLoginEpic = new UserLoginEpic(
                mockLoginService as any, 
                mockUserActions as any,
                mockRouter as any
            );
        });

        it('should initiate login and succeed', (done: DoneFn) => {
            const user: string = 'USER';
            const pass: string = 'PASSWORD';
            const date: number = Date.now();

            spyOn(mockLoginService, 'login')
                .and
                .returnValue( Observable.of(mockUser) );
            spyOn(mockUserActions, 'loginSuccess')
                .and
                .returnValue( mockUserActions.loginSuccess(user, date) );
            spyOn(mockUserActions, 'loginFailed')
                .and
                .returnValue( mockUserActions.loginFailed('Mock Error') )

            action$ = ActionsObservable.of({ 
                type: UserActions.LOGIN_USER_REQUEST,
                username: user,
                pass: pass,
            });

            userLoginEpic.login(action$)
                .subscribe(
                    () => {},

                    () => done.fail('User Login Epic: login fail'),

                    () => { 
                        expect( mockLoginService.login )
                            .toHaveBeenCalledWith(user, pass);
                        expect( mockUserActions.loginSuccess )
                            .toHaveBeenCalledWith(user, date);
                        expect( mockUserActions.loginFailed )
                            .not.toHaveBeenCalled();
                        done();
                    }
                );
        });
        it('should throw error and failed action when login fails', (done: DoneFn) => {
            const user: string = 'cheese';
            const pass: string = 'cheese';
            const date: number = Date.now();
            const mockErrorMsg: string = 'MOCK_ERROR';

            spyOn(mockLoginService, 'login')
                .and
                .returnValue( Observable.throw(mockErrorMsg) );
            spyOn(mockUserActions, 'loginSuccess')
                .and
                .returnValue( mockUserActions.loginSuccess(user, date) );
            spyOn(mockUserActions, 'loginFailed')
                .and
                .returnValue( mockUserActions.loginFailed(mockErrorMsg) );

            action$ = ActionsObservable.of({ 
                type: UserActions.LOGIN_USER_REQUEST,
                username: user,
                pass: pass,
            });

            userLoginEpic.login(action$)
            .subscribe(
                () => {},

                () => done.fail('User Login Epic: login fail'),

                () => { 
                    expect( mockLoginService.login )
                        .toHaveBeenCalledWith(user, pass);
                    expect( mockUserActions.loginFailed )
                        .toHaveBeenCalledWith(mockErrorMsg);
                    expect( mockUserActions.loginSuccess )
                        .not.toHaveBeenCalled();
                    done();
                }
            );

        
        });

    });

    describe('logout', () => {
        beforeEach(() => {
            mockLoginService = new MockLoginService();
            mockUserActions = new MockUserActions();
            mockRouter = new MockRouter();
            userLoginEpic = new UserLoginEpic(
                mockLoginService as any, 
                mockUserActions as any,
                mockRouter as any
            );
        });
        it('should initiate logout and emit action', (done: DoneFn) => {
            spyOn(mockLoginService, 'logout');

            action$ = ActionsObservable.of({ 
                type: UserActions.LOGOUT_USER,
            });

            userLoginEpic.logout(action$)
                .subscribe(
                    (val) => {
                        expect( val ).not.toBeDefined();
                    },

                    () => done.fail('User Login Epic: logout fail'),

                    () => { 
                        expect( mockLoginService.logout )
                            .toHaveBeenCalled();
                        done();
                    }
                );
        });
    });

});