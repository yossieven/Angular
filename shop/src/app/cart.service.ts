import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from './cart';
import { BehaviorSubject } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

export interface Response {
  success: boolean,
  data: Cart[]
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart$ = new BehaviorSubject<Cart>(null);
  private basicURL = 'http://localhost:3000/api/carts/';
  constructor(private http: HttpClient) {

  }


  async createCart(cart: Cart) {
    const finalURL = this.basicURL;
    console.log("URL", finalURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      withCredentials: true
    };

    await this.http.post(finalURL, cart, httpOptions).pipe(
      map((response: Response) => {
        if (response.success) {
          return response.data[0];
        }
        else {
          return null;
        }
      }))
      .subscribe(
        res => {
          if (res != null) {
            console.log("created new user successfully", res);
            this.cart$.next(res);
          }
        }
      );
    console.log("done creating user");
  }
}
