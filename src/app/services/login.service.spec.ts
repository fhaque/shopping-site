import { LoginService } from './login.service';
import { IUser } from '../models/user.model';


// TODO: Needs to change since error handling has changed.

describe('Login Service', () => {
    let loginService: LoginService;

    beforeEach(() => {
        loginService = new LoginService();
    });

    describe('login', () => {

        it('should login given correct user and pass', (done: DoneFn) => {
            const username = 'cheese';
            const pass = 'cheese';

            loginService
                .login(username, pass)
                .subscribe(
                    (user: IUser) => {
                        const tokenObj = JSON.parse(loginService['token']);

                        expect( user ).toEqual({ name: username } as IUser);
                        expect( loginService.isLoggedIn() ).toBe(true);
                        expect( Object.keys(tokenObj) ).toContain('username');
                        expect( Object.keys(tokenObj) ).toContain('expiredAt');
                    },
                    (err: any) => done.fail(err),
                    () => done()
                );
        });

        it('should fail to login given wrong user and pass', (done: DoneFn) => {
            const username: string = 'cheese';
            const pass: string = 'chicken';

            loginService
                .login(username, pass)
                .subscribe(
                    (user: IUser) => done.fail(`Failed to error out on wrong login: ${user}`),
                    (err: Error) => {
                        expect( err ).not.toBeUndefined();
                        expect( loginService.isLoggedIn() ).toBe(false);
                        done();
                    },
                    () => done.fail('Failed to error out on wrong login info.')
                );
        });
    });

    it('should reset token on logout', () => {
        loginService.logout();
        expect( loginService['token'] ).toBeNull();
        expect( loginService.isLoggedIn() ).toBe(false);
    });

    it('should reset token on logout after logging in', (done: DoneFn) => {
        const username = 'cheese';
        const pass = 'cheese';

        loginService
            .login( username, pass )
            .subscribe(
                (user: IUser) => { },
                (err: any) => done.fail(err),
                () => {
                    loginService.logout();
                    expect( loginService['token'] ).toBeNull();
                    expect( loginService.isLoggedIn() ).toBe(false);
                    done();
                }
            );
    })

});
