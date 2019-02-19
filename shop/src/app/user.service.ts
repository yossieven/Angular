import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject } from 'rxjs/Rx';


export interface Response {
  success: boolean,
  data: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basicURL = 'http://localhost:3000/api/users/';
  public user$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  checkLogin(email: string, password: string) {

    const loginURL = this.basicURL + "login";
    console.log("checkLogin with URL", loginURL);
    const params = {
      email: email,
      password: password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    return this.http.post(loginURL, params, httpOptions).map(
      (response: Response) => {
        console.log("returned data", response);
        if (response.success) {
          return response.data;
        }
        else {
          BehaviorSubject.throw('Authentication Failed!');
        }
      }).subscribe(
        res => {
          console.log("res", res);
          this.user$.next(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  /**
   * check whether user has still active cart.
   * @param id 
   */
  isUserHasActiveCart(id: number) {
    // to check if user has cart and order.
  }

}
