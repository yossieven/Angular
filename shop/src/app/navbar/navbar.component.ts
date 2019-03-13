import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: User = null;
  constructor(private userService: UserService, private router: Router, private utilityService: UtilitiesService) {
    if (this.utilityService.isUserLogged()) {
      this.userService.getUser(localStorage.getItem('loggedUser'));
    }
    else {
      this.user = null;
    }

    this.userService.user$.subscribe({
      next: (data) => {
        console.log("navbar: subcribe to User", data);
        if (data == null || data.length == 0) {
          this.user = null;
        }
        else {
          this.user = data[0];
        }

      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
  }

  logout() {
    console.log('logging out...');
    this.userService.logout().subscribe((boolRes) => {
      if (boolRes) {
        this.router.navigate(['home']);
      }
      else {
        alert("failed to login");
      }
    })
  }

  donothing() { }
}
