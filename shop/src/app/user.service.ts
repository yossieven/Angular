import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Cart } from './cart';
import { OrdersService } from './orders.service';
import { CartService } from './cart.service';


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
  // public userCart$ = new BehaviorSubject<Cart>(null);

  constructor(private http: HttpClient, private orderService: OrdersService, private cartService: CartService) {

  }

  /**
   * will check user credentials and send back User data if successful.
   * will subscribe to the User if found and will send back whether user
   * has any active cart.
   * we are basically catching all errors at this point and sending null to avoid 
   * death of subject.
   * @param email 
   * @param password 
   */
  checkLogin(email: string, password: string) {

    this.login(email, password).subscribe(
      res => {
        console.log("user service, checkLogin: subscribed to user", res);
        this.cartService.isUserHasActiveCart(res[0].id).subscribe((boolRes) => {
          this.isUserHasCart = boolRes;
          this.user$.next(res);
          console.log('userService: checkLogin - subscribe to user after checking cart', res);
        });
      },
      err => {
        console.log("Error occured", err);
        this.user$.next(null);
      }
    );
  }

  /**
   * check whether user has still active cart.
   * @param id 
   */
  // isUserHasActiveCart(id: string): Observable<boolean> {
  //   // to check if user has cart and order.
  //   const loginURL = this.basicURL + id + "/hasCart";
  //   console.log("user service, isUserHasActiveCart: check if has cart with URL", loginURL);
  //   return this.http.get(loginURL).
  //     map(
  //       (response: Response) => {
  //         console.log("user service, isUserHasActiveCart: returned data", response);
  //         if (response.success) {
  //           this.orderService.isExistOrderByCart(String(response.data[0].id)).subscribe(res => {
  //             if (res) {
  //               this.userCart$.next(null);
  //               return false;
  //             }
  //             else {
  //               this.userCart$.next(response.data[0]);
  //               return true;
  //             }
  //           })
  //         }
  //         else {
  //           this.userCart$.next(null);
  //           return false;
  //         }
  //       });
  // }

  checkSession(): Observable<boolean> {
    // to check if user has cart and order.
    const checkSessionURL = this.basicURL + "session/isLogged?id=" + localStorage.getItem('loggedUser');
    console.log("user service, checkSession: check if session active", checkSessionURL);
    return this.http.get(checkSessionURL, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true }).
      map(
        (response: Response) => {
          console.log("user service, checkSession: returned data", response);
          if (response.success) {
            return true;
          }
          else {
            return false;
          }
        });
  }

  createUser(user: User) {
    const createUserURL = this.basicURL;
    console.log("createUser with URL", createUserURL);

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

      }),
      withCredentials: true
    };

    console.log("creating user with params", params);
    this.http.post(createUserURL, params, httpOptions)
      .map((response: Response) => {
        if (response.success) {
          return response.data;
        }
        else {
          return null;
        }
      })
      .subscribe(
        res => {
          if (res != null) {
            console.log("created new user successfully", res);
            this.user$.next(res);
          }
        }
      );
    console.log("done creating user");
  }

  /**
   * call REST to check whether email and password are ok.
   * if success, register the user id in local storage. 
   * Otherwise throw error.
   * @param email 
   * @param password 
   */
  login(email: string, password: string): Observable<User[]> {
    const loginURL = this.basicURL + "login";
    console.log("userService: login - with URL", loginURL, "email: ", email, "password: ", password);

    const params = {
      email: email,
      password: password
    }

    return this.http.post(loginURL, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true

    }).map(
      (response: Response) => {
        console.log("userService: login - returned data", response);
        if (response.success) {
          localStorage.setItem('loggedUser', response.data[0].id);
          return response.data;
        }
        else {
          console.log("userService: login - failed");
          throw (new Error('user service, checkLogin: Authentication Failed!'));
          //return null;
        }
      })
  }

  logout(): Observable<boolean> {
    const logoutURL = this.basicURL + "logout";
    console.log("user service, logout: logout with URL", logoutURL);

    return this.http.post(logoutURL, null, {
      headers: new HttpHeaders({
        'Content-Type': 'text/html'
      }),
      withCredentials: true,
      responseType: 'text'
    }).
      map(
        (response) => {
          console.log("user service, logout: returned data", response);
          if (response === 'exit') {
            this.user$.next([]);
            localStorage.removeItem('loggedUser');
            this.cartService.cart$.next(null);
            this.isUserHasCart = false;
            return true;
          }
          else {
            return false;
          }
        });
  }

  getUser(id: string) {
    // to check if user has cart and order.
    const getUserURL = this.basicURL + id;
    console.log("user service, getUser: with URL", getUserURL);
    this.http.get(getUserURL).
      map(
        (response: Response) => {
          console.log("user service, getUser: returned data", response);
          if (response.success) {
            return response.data;
          }
          else {
            return null;

          }
        }).subscribe(res => {
          this.user$.next(res);
          console.log("get user successfully", res);
        }
        );;
  }
}
