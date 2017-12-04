export interface IUser {
    name: string,
}

export interface ICurrentUserState {
    user: IUser | null,
    isLoggingIn: boolean,
    loggedInOn: number | null,
}