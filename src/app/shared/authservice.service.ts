import {Injectable} from '@angular/core';
import {Auth} from "../models/auth.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../models/login.model";

const headerOp = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'x-api-key': 'CODEX@123'})
}

@Injectable({
    providedIn: 'root'
})
export class AuthserviceService {
  readonly postUser = 'http://localhost/api/auth/index.php/api/user/postUser';
  readonly logUrl = 'http://localhost/api/auth/index.php/api/userlogin/loginUser';
    constructor(private http: HttpClient) {
    }
    addUser(user: Auth) {
        return this.http.post(this.postUser, user, headerOp).pipe()
    }
    loginUser(user: Login){
        console.log(user);
        return this.http.post(this.logUrl, user, headerOp).pipe()
    }
    logout(): void {
        localStorage.setItem('isLoggedIn', "false");
        localStorage.removeItem('token');
    }
}
