import { ICurrentUserState, IUser } from '../models/user.model';
import { AnyAction } from 'redux';
import { UserActions } from '../actions/user.actions';
import { INITIAL_STATE } from '../store/initial-state';

export const currentUserState = (
    state: ICurrentUserState = INITIAL_STATE.currentUserState, 
    action: AnyAction 
): ICurrentUserState => {
    const initialState = INITIAL_STATE.currentUserState;
    
    switch( action.type ) {
        case UserActions.LOGIN_USER_REQUEST:
            return {...initialState, isLoggingIn: true };
        case UserActions.LOGIN_USER_SUCCESS:
            return {
                ...initialState, 
                isLoggingIn: false, 
                loggedInOn: action.loggedInOn,
                user: action.user
            };
        case UserActions.LOGIN_USER_FAIL:
            return initialState;
        case UserActions.LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}