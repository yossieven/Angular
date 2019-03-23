import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from './cart';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { OrdersService } from './orders.service';

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
  constructor(private http: HttpClient, private orderService: OrdersService) {

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
            console.log("created new cart successfully", res);
            this.cart$.next(res);
          }
        }
      );
    console.log("done creating Cart");
  }

  removeCart(id): Observable<boolean> {
    const finalURL = this.basicURL + id;
    console.log("URL", finalURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      withCredentials: true
    };

    return this.http.delete<Response>(finalURL, httpOptions).pipe(
      map((response: Response) => {
        if (response.success) {
          return true;
        }
        else {
          return false;
        }
      }));

  }

  /**
   * check whether user has still active cart.
   * @param id 
   */
  isUserHasActiveCart(id: string): Observable<boolean> {
    // to check if user has cart and order.
    const cartURL = this.basicURL + "user/" + id;
    console.log("cartService: isUserHasActiveCart - check if cart by user with URL", cartURL);
    return this.http.get(cartURL).
      map(
        (response: Response) => {
          let cartExists: boolean = false;
          let currentCart: Cart = null;
          console.log("cartService: isUserHasActiveCart - returned data", response);
          if (response.success) {
            for (let cart of response.data) {
              this.orderService.isExistOrderByCart(String(cart.id)).map(res => {
                if (res) {
                  cartExists = false;
                  currentCart = null;
                  return false;
                }
                else {
                  cartExists = true;
                  currentCart = cart;
                  return true;
                }
              }).subscribe(subRes => { this.cart$.next(currentCart); });
            }



          }
          else {
            this.cart$.next(null);
            return false;
          }
        });
  }


}
