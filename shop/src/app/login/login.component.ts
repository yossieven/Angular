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
  isDisplayShopping: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(value: any) {
    console.log("login");
    this.userService.user$.subscribe(
      data => { this.user = data[0]; this.isDisplayShopping = true; this.userService },
      error => { console.error(`Error in retrieving user : `, error); this.isDisplayShopping = false; }
    );
    this.userService.checkLogin(value.userEmail, value.userPass);

  }
}
