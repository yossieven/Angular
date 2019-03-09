import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { DetailsItem } from './details-item';

export interface Response {
  success: boolean,
  data: CartItem[]
}

export interface ResponseDetailed {
  success: boolean,
  data: DetailsItem[]
}

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  public items$ = new BehaviorSubject<CartItem[]>([]);
  public currentCartItems: CartItem[] = [];
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

    console.log("creating item with params", item);
    this.http.post(this.basicURL, item, httpOptions)
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
            console.log("created new item successfully", res);
            this.currentCartItems.push(res[0]);
            this.items$.next(this.currentCartItems);
          }
        }
      );
    console.log("done creating item");
  }

  getItemById(id): Observable<DetailsItem> {

    const finalURL = this.basicURL + id;

    console.log("URL", finalURL);

    const httpOptions = {
      withCredentials: true
    };

    return this.http.get<ResponseDetailed>(finalURL, httpOptions).pipe(
      map(
        (response) => {
          console.log("returned data", response);
          return response.data[0] as DetailsItem;
        }));
  }
}
