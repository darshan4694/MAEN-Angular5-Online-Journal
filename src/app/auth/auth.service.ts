import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  BASE_URL: String = "http://localhost:2000";
  sub = new Subject();
  constructor(private _http: HttpClient, private _cookie: CookieService, private _router: Router) { }

  registerNewUser(user) {
    return this._http.post(this.BASE_URL+'/register',user )
  }

  loginUser(creds) {
    console.log("creds", creds);
    this._http.post(this.BASE_URL+"/login", creds).subscribe((data: any)=>{
      if(data.success){
        alert("Login successful");
        this._cookie.set('token', data.token);
        this._cookie.set('username', creds.username);
        this._router.navigate(['home']);
        this.sub.next(true);
      }
    })
  }

  getUserDetails() {
    return this._http.get(this.BASE_URL+'/getuser');
  }
  fetchUsername() {
    return this._cookie.get('username');
  }
  fetchToken() {
    return this._cookie.get('token');
  }

  checkLogin() {
    if(this.fetchToken()){
      return true;
    } else {
      return false;
    }
  }

  signout() {
    this._cookie.delete('token');
    this.sub.next(false);
  }
}
