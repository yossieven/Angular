import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  user: User = null;
  isHasCart: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    //check if session active
    this.userService.checkSession().subscribe((boolRes) => {
      if (!boolRes) {
        console.log('login required');
        this.router.navigate(['home']);
      }

    });

    this.userService.user$.subscribe(
      data => {
        if (data == null) {
          this.isHasCart = false;
        }
        else {
          this.user = data[0];
          console.log("shop: subscribe to User - returned from service", this.user);
          this.isHasCart = this.userService.isUserHasCart;
        }
      },
      error => {
        console.error(`login: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );
  }

  ngOnInit() {

  }

}
