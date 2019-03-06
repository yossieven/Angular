import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: User = null;
  constructor(private userService: UserService, private router: Router) {

    this.userService.user$.subscribe({
      next: (data) => {
        if (data == null || data.length == 0) {
          this.user = null;
        }
        else {
          this.user = data[0];
          console.log("navbar: subscribed to user ID", this.user.id);
        }

      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe((boolRes) => {
      if (boolRes) {
        this.router.navigate(['home']);
      }
      else {
        alert("failed to login");
      }
    })
  }
}
