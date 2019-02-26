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


    this.http.post(loginURL, params, httpOptions).map(
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
          if (res) {
            console.log("res", res);
            this.isUserHasActiveCart(parseInt(res[0].id)).subscribe((boolRes) => { this.isUserHasCart = boolRes; this.user$.next(res); });
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
  isUserHasActiveCart(id: number): Observable<boolean> {
    // to check if user has cart and order.
    const loginURL = this.basicURL + id + "/hasCart";
    console.log("check if has cart with URL", loginURL);
    return this.http.get(loginURL).
      map(
        (response: Response) => {
          console.log("returned data", response);
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

}
