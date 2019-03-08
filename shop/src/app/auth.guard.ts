import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (this.userService.checkSession()) {
      return true;
    }
    else {
      //this.router.navigate(['home']);
      return false;
    }
  }
}
