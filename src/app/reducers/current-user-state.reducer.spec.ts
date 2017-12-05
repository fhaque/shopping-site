import { currentUserState } from './current-user-state.reducer';
import { ICurrentUserState, IUser } from '../models/user.model';
import { INITIAL_STATE } from '../store/initial-state';
import { AnyAction } from 'redux';
import { UserActions } from '../actions/user.actions';

describe('Current User State Reducer', () => {
    it('should initialize with no user logged in', () => {
        const action: AnyAction = { type: '' };
        const afterState: ICurrentUserState = INITIAL_STATE.currentUserState;

        expect( currentUserState(undefined, action) ).toEqual( afterState );
    });

    describe('user login request with LOGIN_USER_REQUEST action', () => {
        it('should set flag that logging in is in progress', () => {
            const username: string = 'cheese';
            const pass: string = 'gwah';

            const action: AnyAction = { 
                type: UserActions.LOGIN_USER_REQUEST,
                username,
                pass
            };
            const afterState: ICurrentUserState = {
                ...INITIAL_STATE.currentUserState,
                isLoggingIn: true
            };

            expect( currentUserState(undefined, action) )
            .toEqual( afterState );
        });

        it('should reset current user state', () => {
            const username: string = 'cheese';
            const pass: string = 'gwah';

            const beforeState: ICurrentUserState = {
                user: {
                    name: 'bob',
                },
                loggedInOn: Date.now(),
                isLoggingIn: false,
            }
            const action: AnyAction = { 
                type: UserActions.LOGIN_USER_REQUEST,
                username,
                pass
            };
            const afterState: ICurrentUserState = {
                ...INITIAL_STATE.currentUserState,
                isLoggingIn: true
            };

            expect( currentUserState(beforeState, action) )
                .toEqual( afterState );
        });
    });

    describe('user login success with LOGIN_USER_SUCCESS action', () => {
        it('should set flag that logging in stopped', () => {
            const loggedInOn: number = Date.now();
            const user: IUser = {
                name: 'bob',
            };
            const action: AnyAction = { 
                type: UserActions.LOGIN_USER_SUCCESS,
                loggedInOn,
                user  
            };
            const afterState: ICurrentUserState = {
                ...INITIAL_STATE.currentUserState,
                user,
                loggedInOn,
            };

            expect( currentUserState(undefined, action) )
                .toEqual( afterState );
        });

        it('should reset with new user data', () => {
            const loggedInOn: number = Date.now();
            const user: IUser = {
                name: 'bob',
            };

            const beforeState: ICurrentUserState = {
                user: { name: 'cheese' },
                loggedInOn: Date.now() - 100,
                isLoggingIn: true,
            };
            const action: AnyAction = { 
                type: UserActions.LOGIN_USER_SUCCESS,
                loggedInOn,
                user  
            };
            const afterState: ICurrentUserState = {
                ...INITIAL_STATE.currentUserState,
                user,
                loggedInOn,
            };

            expect( currentUserState(beforeState, action) )
                .toEqual( afterState );
        });
    });

    it('should reset user state with LOGIN_USER_FAIL action', () => {
        const action: AnyAction = {
            type: UserActions.LOGIN_USER_FAIL,
            error: { message: 'Error!!' }
         };
         const afterState: ICurrentUserState = INITIAL_STATE.currentUserState;

         expect( currentUserState(undefined, action) ).toEqual( afterState );

    });
    it('should reset user state with LOGOUT_USER action', () => {
        const loggedInOn: number = Date.now();
        const user: IUser = {
            name: 'bob',
        };

        const beforeState: ICurrentUserState = {
            ...INITIAL_STATE.currentUserState,
            user,
            loggedInOn,
        };
        const action: AnyAction = {
            type: UserActions.LOGOUT_USER,
         };
        const afterState: ICurrentUserState = INITIAL_STATE.currentUserState;

         expect( currentUserState(beforeState, action) ).toEqual( afterState );
    });
}); 