import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  isHasCart: boolean = false;
  loginFailed: boolean = false;
  noLogin: boolean = false;
  needExit: boolean = false;

  constructor(private userService: UserService, private router: Router, private utilityService: UtilitiesService) {

    console.log("login: user before subcription", this.userService.user$);
    this.userService.user$.subscribe(
      data => {
        if (data == null) {
          this.isHasCart = false;
          this.loginFailed = true;
        }
        else {
          this.user = data[0];
          console.log("login: subscribe to User - returned from service", this.user);
          this.isHasCart = this.userService.isUserHasCart;
          this.loginFailed = false;

        }
      },
      error => {
        console.error(`login: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;
        this.loginFailed = true;
      }
    );
  }

  ngOnInit() {
    console.log("back from the dead", this.user)
  }

  login(value: any) {
    console.log("login for ", value.userEmail);
    this.user = null;
    if (value.userEmail == "" || value.userPass == "") {
      this.loginFailed = false;
      this.noLogin = true;
      return;
    }
    else {
      this.noLogin = false;
      this.loginFailed = false;
    }
    try {
      this.userService.checkLogin(value.userEmail, value.userPass);
      this.loginFailed = false;
    }
    catch (err) {
      console.log("login: login - caught error");
      this.loginFailed = true;
    }

  }

  register() {
    if (!this.utilityService.isUserLogged()) {
      console.log("navigating");
      this.router.navigate(['../register']);
      this.noLogin = false;
      this.loginFailed = false;
      this.needExit = false;
    }
    else {
      this.noLogin = false;
      this.loginFailed = false;
      this.needExit = true;
    }
  }

  shop() {
    this.router.navigate(['shop']);
  }
}
