import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Cart } from './cart';


export interface Response {
  success: boolean,
  data: any[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basicURL = 'http://localhost:3000/api/users/';
  public user$ = new BehaviorSubject<User[]>([]);
  public isUserHasCart: boolean = false;
  public userCart$ = new BehaviorSubject<Cart>(null);

  constructor(private http: HttpClient) { }

  /**
   * will check user credentials and send back User data if successful.
   * will subscribe to the User if found and will send back whether user
   * has any active cart.
   * @param email 
   * @param password 
   */
  checkLogin(email: string, password: string) {
    const loginURL = this.basicURL + "login";
    console.log("checkLogin with URL", loginURL, "email: ", email, "password: ", password);
    const params = {
      email: email,
      password: password
    }


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    this.http.post(loginURL, params, httpOptions).map(
      (response: Response) => {
        console.log("user service, checkLogin: returned data", response);
        if (response.success) {
          return response.data;
        }
        else {
          BehaviorSubject.throw('user service, checkLogin: Authentication Failed!');
        }
      }).subscribe(
        res => {
          console.log("user service, checkLogin: subscribed to user", res);
          if (res) {
            this.isUserHasActiveCart(res[0].id).subscribe((boolRes) => { this.isUserHasCart = boolRes; this.user$.next(res); });
          }
          else {
            this.isUserHasCart = false;
            this.user$.next([]);
          }
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
  isUserHasActiveCart(id: string): Observable<boolean> {
    // to check if user has cart and order.
    const loginURL = this.basicURL + id + "/hasCart";
    console.log("user service, isUserHasActiveCart: check if has cart with URL", loginURL);
    return this.http.get(loginURL).
      map(
        (response: Response) => {
          console.log("user service, isUserHasActiveCart: returned data", response);
          if (response.success) {
            this.userCart$.next(response.data[0]);
            return true;
          }
          else {
            this.userCart$.next(null);
            return false;
          }
        });
  }

  createUser(user: User) {
    const loginURL = this.basicURL;
    console.log("createUser with URL", loginURL);

    const params = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      last_name: user.last_name,
      city: user.city,
      street: user.street,
      role: 0
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const createdUser: Array<User> = [];
    console.log("creating user with params", params);
    this.http.post(loginURL, params, httpOptions).
      map(
        (response: Response) => {
          console.log("user service, createUser: returned data", response);
          if (response.success) {
            console.log("created");
            createdUser.push(user);
            this.user$.next(createdUser);
          }
          else {
            console.log("not created");
            this.user$.next(null);
          }
        })
      .subscribe(
        res => {
          console.log("created new user successfully", res);
        },
        err => {
          console.log("there was a problem in creating new user", err);
        }
      );
  }

}
