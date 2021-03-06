import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { DetailsItem } from './details-item';

export interface Response {
  success: boolean,
  data: DetailsItem[]
}


@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  public items$ = new BehaviorSubject<DetailsItem[]>([]);
  public currentCartItems: DetailsItem[] = [];
  private basicURL = 'http://localhost:3000/api/cartItems/';
  public detailedItem: DetailsItem;

  constructor(private http: HttpClient) { }

  /**
   * get all items in all carts or get all items for specific cart.
   * @param specific 
   */
  async getItems(specific: string) {
    let finalURL = "";
    const params = specific || '';

    if (params != '') {
      finalURL = this.basicURL + "bycart/" + params;
    }
    else {
      finalURL = this.basicURL
    }
    console.log("URL", finalURL);

    const httpOptions = {
      withCredentials: true
    };

    await this.http.get(finalURL, httpOptions).pipe(
      map(
        (response: Response) => {
          console.log("returned data", response);

          return response.data;

        })).subscribe(response => this.items$.next(response));
  }

  addItemToCart(item: CartItem) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      withCredentials: true
    };


    console.log("CartItemService: addItemToCart - creating item with params", item);
    this.http.post(this.basicURL, item, httpOptions)
      .map((response: Response) => {
        if (response.success) {
          return response.data[0];
        }
        else {
          return null;
        }
      })
      .subscribe(
        res => {
          if (res != null) {
            console.log("created new item successfully", res);
            this.getItems(item.cart_id.toString());
          }
        }
      );
  }

  getItemById(id): Observable<DetailsItem> {

    const finalURL = this.basicURL + id;

    console.log("URL", finalURL);

    const httpOptions = {
      withCredentials: true
    };

    return this.http.get<Response>(finalURL, httpOptions).pipe(
      map(
        (response) => {
          console.log("returned data", response.data[0]);
          return response.data[0] as DetailsItem;
        }));
  }

  updateItem(item: CartItem) {
    const finalURL = this.basicURL + item.id;

    console.log("URL", finalURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.post(finalURL, item, httpOptions)
      .map(
        (response: Response) => {
          console.log("returned data", response.data[0]);
          return response.data[0] as DetailsItem;
        })
      .subscribe(
        res => {
          if (res != null) {
            console.log("updated item amount successfully", res);
            this.getItems(item.cart_id.toString());
          }
          err => {
            console.log("update error", err);
          }
        });
  }

  deleteCartItem(id, cartId): Observable<boolean> {
    const finalURL = this.basicURL + id;

    console.log("URL", finalURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.delete<Response>(finalURL, httpOptions)
      .map(
        (response: Response) => {
          console.log("returned data", response.data);
          if (response.success) {
            return true;
          }
          else {
            return false;
          }
        })

  }

  deleteCartItemsFromCart(id): Observable<boolean> {
    const finalURL = this.basicURL + "cart/" + id;

    console.log("URL", finalURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    return this.http.delete<Response>(finalURL, httpOptions)
      .map(
        (response: Response) => {
          console.log("returned data", response.data);
          if (response.success) {
            return true;
          }
          else {
            return false;
          }
        })

  }
}
