import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.checkSession().map(res => {
      console.log("AuthGuard: canActivate - session is active?", res);
      if (res) {
        return res;
      }
      else {
        this.router.navigate(['home']);
        return res;
      }
    })
  }
}
