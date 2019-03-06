import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';


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

  constructor(private userService: UserService, private router: Router) {
    // //check if session active
    // console.log('check if logged in');
    // this.userService.checkSession().subscribe((boolRes) => {
    //   if (!boolRes) {
    //     console.log('login required');
    //     // this.router.navigate(['home']);
    //   }
    //   else {
    //     console.log("logged in");
    //   }
    // });
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
    console.log("navigating");
    this.router.navigate(['../register']);
  }

  shop() {
    this.router.navigate(['shop']);
  }
}
