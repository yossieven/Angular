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
  user: User = null;
  isHasCart: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    this.userService.user$.subscribe(
      data => { this.user = data[0]; console.log("login: returned from service", this.user); this.isHasCart = this.userService.isUserHasCart },
      error => { console.error(`login: Error in retrieving user : `, error); this.isHasCart = false; }
    );
  }

  ngOnInit() {
    console.log("back from the dead", this.user)
  }

  login(value: any) {
    console.log("login for ", value.userEmail);
    this.user = null;
    this.userService.checkLogin(value.userEmail, value.userPass);
    //this.userService.isUserHasActiveCart(parseInt(this.user.id)).subscribe(hasCart => this.isDisplayShopping = hasCart);

  }

  register() {
    console.log("navigating");
    this.router.navigate(['../register']);
  }
}
