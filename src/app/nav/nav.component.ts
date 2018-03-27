import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn = this._auth.checkLogin();
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.sub.subscribe((data: boolean)=>{
      this.isLoggedIn = data;
    })
  }

  signoutFn(){
    this._auth.signout();
  }
}

