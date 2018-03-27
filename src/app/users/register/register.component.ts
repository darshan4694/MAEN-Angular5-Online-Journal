import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser={
    username: "",
    lastname: "",
    firstname: "",
    email: "",
    password: ""
  }
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerFn() {
    console.log(this.newUser);
    this._auth.registerNewUser(this.newUser).subscribe((data: any)=>{
      console.log(data);
      if(data.success){
        alert('Registration successful!');
        this._router.navigate(['login']);
      } else {
        alert("registration not done! try again!");
      }
    });
  }

}
