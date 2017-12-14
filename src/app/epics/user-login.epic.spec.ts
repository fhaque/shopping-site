import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
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


describe('UserLoginEpic', () => {
    const mockUser: IUser = { name: 'MOCK_user' };

    let mockUserActions: any;
    let mockLoginService: any;
    let mockRouter: any;
    let userLoginEpic: UserLoginEpic;
    let action$: any;
    let userLoginEpicFactory: (loginService: any, userActions: any) =>
      UserLoginEpic;

    beforeEach(() => {
        mockRouter = jasmine.createSpyObj('router', ['navigate']);

        userLoginEpicFactory = (loginService, userActions) =>
            new UserLoginEpic(
                loginService as LoginService,
                userActions as UserActions,
                mockRouter as Router
            );
    });

    describe('login', () => {
        const user = 'USER';
        const pass = 'PASSWORD';
        const date: number = Date.now();
        const err = 'Mock Error';
        const mockLoginSuccessAction = {
            type: 'MOCK_LOGIN_SUCCESS',
            user,
            date,
        };
        const mockLoginFailedAction = {
            type: 'MOCK_LOGIN_ERROR',
            err
        };

        beforeEach(() => {
            action$ = ActionsObservable.of({
                type: UserActions.LOGIN_USER_REQUEST,
                username: user,
                pass: pass,
            });
        });

        it('should initiate login with login request', (done: DoneFn) => {
            mockLoginService = jasmine.createSpyObj('loginService', {
                login: Observable.of(mockUser),
            });
            mockUserActions = jasmine
                .createSpyObj('userActions', ['loginSuccess', 'loginFailed']);

            userLoginEpic = userLoginEpicFactory(
                mockLoginService,
                mockUserActions
            );

            userLoginEpic
                .login(action$)
                .subscribe( action => {
                    expect( mockLoginService.login )
                        .toHaveBeenCalledWith(user, pass);
                    done();
                });
        });

        it('should emit login success action with login service success',
            (done: DoneFn) => {
                mockLoginService = { login: () => Observable.of(mockUser) };
                mockUserActions = { loginSuccess: () =>
                  mockLoginSuccessAction
                };

                userLoginEpic = userLoginEpicFactory(
                    mockLoginService,
                    mockUserActions
                );

                userLoginEpic
                    .login(action$)
                    .subscribe( action => {
                        expect( action ).toEqual( mockLoginSuccessAction );
                        done();
                    });
            }
      );

        it('should emit failed login action if login fails', (done: DoneFn) => {
            mockLoginService = { login: () => Observable.throw(err) };
            mockUserActions = { loginFailed: () => mockLoginFailedAction };

            userLoginEpic = userLoginEpicFactory(
                mockLoginService,
                mockUserActions
            );

            userLoginEpic
            .login(action$)
            .subscribe( action => {
                expect( action ).toEqual( mockLoginFailedAction );
                done();
            });
        });

    });

    describe('loginSuccess', () => {
      it('should router navigate to home with login success action',
          (done: DoneFn) => {
              userLoginEpic = userLoginEpicFactory(
                  mockLoginService,
                  mockUserActions
              );

              action$ = ActionsObservable.of({
                  type: UserActions.LOGIN_USER_SUCCESS,
              });

              userLoginEpic
                  .loginSuccess(action$)
                  .subscribe(
                      () => expect( mockRouter ).toHaveBeenCalled(),

                      undefined,

                      () => done()
                  );
          });
    });

    describe('logout', () => {
        beforeEach(() => {
            action$ = ActionsObservable.of({
                type: UserActions.LOGOUT_USER,
            });
        });

        it('should initiate logout with logout request', (done: DoneFn) => {
            mockLoginService = jasmine.createSpyObj('loginService', {
                logout: undefined,
            });
            mockUserActions = {};

            userLoginEpic = userLoginEpicFactory(
                mockLoginService,
                mockUserActions
            );

            userLoginEpic.logout(action$)
                .subscribe(
                    () => {},

                    () => done.fail('User Login Epic: logout fail'),

                    () => {
                        expect( mockLoginService.logout )
                            .toHaveBeenCalled();
                        done();
                    }
                );
        });

        it('should emit no action upon logging out', (done: DoneFn) => {
            mockLoginService = { logout: () => {} };
            mockUserActions = {};

            userLoginEpic = userLoginEpicFactory(
                mockLoginService,
                mockUserActions
            );

            userLoginEpic.logout(action$)
                .subscribe(
                    (val) => {
                      expect( val ).not.toBeDefined();
                    },

                    () => done.fail('User Login Epic: logout fail'),
                    () => done()
                );
        });
    });

});
