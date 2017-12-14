import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from './login.service';
import { Location } from "@angular/common";

@Injectable()
export class LoginRouteGuard implements CanActivate {

    constructor(
        private router: Router,
        private location: Location,
        private loginService: LoginService,
    ) { }

    canActivate() {
        if ( this.loginService.isLoggedIn() ) {
            return true;
        }

        // this.location.back(); //TODO: How to retain state?

        this.router.navigate(
            ['login'], 
            { queryParams: {msg: 'Need to login first!'} }
        );
        return false;
    }
}