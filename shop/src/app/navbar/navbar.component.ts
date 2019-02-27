import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: User = null;
  constructor(private userService: UserService) {

    this.userService.user$.subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.user = data[0];
          console.log("navbar: subscribed to user ID", this.user.id);
        }
        else {
          this.user = null;
        }
      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
  }

}
