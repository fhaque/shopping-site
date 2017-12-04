import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService {
    private token: string = null;

    login(user: string, pass: string): Observable<boolean> {
        if (user === "cheese" && pass === "cheese") {
            this.token = JSON.stringify({ 
                username: "cheese", 
                expiredAt: 10 * Date.now()  
            });

            //TODO: Add local storage

            return Observable.of( true );
        }
        return Observable.of( false );
    }

    logout() {
        this.token = null;
    }

    isLoggedIn(): boolean {
        return (this.token) ? true : false;
    }
}