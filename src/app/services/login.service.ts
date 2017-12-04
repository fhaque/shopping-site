import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    isLoggedIn(): boolean {
        console.log("Login service says logged in");
        return true;
    }
}