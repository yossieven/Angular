import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  isHasCart: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(value: any) {
    console.log("login");

    this.userService.checkLogin(value.userEmail, value.userPass);
    //this.userService.isUserHasActiveCart(parseInt(this.user.id)).subscribe(hasCart => this.isDisplayShopping = hasCart);
    this.userService.user$.subscribe(
      data => { this.user = data[0]; console.log("login: returned from service", this.user); this.isHasCart = this.userService.isUserHasCart },
      error => { console.error(`login: Error in retrieving user : `, error); this.isHasCart = false; }
    );
    console.log("login: user", this.user);

  }
}
