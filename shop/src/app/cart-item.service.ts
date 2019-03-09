import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CartItem } from './cart-item';
import { BehaviorSubject } from 'rxjs/Rx';

export interface Response {
  success: boolean,
  data: CartItem[]
}

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  public items$ = new BehaviorSubject<CartItem[]>([]);
  private basicURL = 'http://localhost:3000/api/cartItems/';

  constructor(private http: HttpClient) { }

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

        })).subscribe(response => this.items$.next(response))
  }
}
