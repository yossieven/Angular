import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities.service';
import { Subscription } from 'rxjs/Rx';
import { CartService } from '../cart.service';


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
  isAdmin: boolean = false;
  cartSubscription: Subscription;

  constructor(private userService: UserService, private router: Router, private utilityService: UtilitiesService, private cartService: CartService) {

    console.log("login: user before subcription", this.userService.user$);
    this.userService.user$.subscribe(
      data => {
        if (data == null) {
          console.log("LoginComponent: subscribe to user - failed login");
          this.isHasCart = false;
          this.loginFailed = true;
          this.isAdmin = false;
          this.noLogin = false;
        }
        else if (data.length == 0) {
          console.log("LoginComponent: subscribe to user - no login yet");
          this.isHasCart = false;
          this.loginFailed = false; //first time retrieval of data.
          this.isAdmin = false;
          this.noLogin = true;
        }
        else {
          this.loginFailed = false;
          this.noLogin = false;
          this.user = data[0];
          if (this.user.role) {
            console.log("LoginComponent: subscribe to user - regular user");
            this.isAdmin = false;
          }
          else {
            console.log("LoginComponent: subscribe to user - admin user");
            this.isAdmin = true;
            this.admin();
          }
          console.log("LoginComponent: subscribe to User - returned from service", this.user);
        }
      },
      error => {
        console.error(`LoginComponent: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;
        this.loginFailed = true;
      }
    );

    this.cartSubscription = this.cartService.cart$.subscribe({
      next: (data) => {
        console.log("shop-info: subscribed to user cart", data);
        if (data != null) {
          this.isHasCart = true;
        }
        else {
          this.isHasCart = false;
        }

      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
    console.log("back from the dead", this.user)
  }

  login(value: any) {
    console.log("login for ", value.userEmail);
    this.user = null;
    if (value.userEmail == "" || value.userPass == "") {
      console.log("LoginComponent: login - no login yet");
      this.loginFailed = false;
      this.noLogin = true;
      return;
    }
    else {
      this.noLogin = false;
      this.loginFailed = false;
    }
    try {
      console.log("LoginComponent: login - call to check login");
      this.userService.checkLogin(value.userEmail, value.userPass);
      this.loginFailed = false;
    }
    catch (err) {
      console.log("LoginComponent: login - caught error");
      this.loginFailed = true;
    }

  }

  register() {
    if (!this.utilityService.isUserLogged()) {
      console.log("LoginComponent: register - navigating");
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

  admin() {
    console.log("LoginComponent: admin - navigating");
    this.router.navigate(['admin']);
  }
}
