import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

export interface Response {
  success: boolean,
  data: Order[]
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  basicURL = 'http://localhost:3000/api/orders/';
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Response> {
    return this.http.get<Response>(this.basicURL);
  }

  createOrder(order: Order): Observable<Order> {
    const createOrderURL = this.basicURL;
    console.log("createOrder with URL", createOrderURL);

    const params = {
      id: order.id,
      user_id: order.user_id,
      total: order.total,
      cart_id: order.cart_id,
      city: order.city,
      street: order.street,
      shipping_date: order.shipping_date,
      creation_date: order.creation_date,
      last_four: order.last_four
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      }),
      withCredentials: true
    };

    console.log("OrderService: createOrder - creating order with params", params);
    return this.http.post<Response>(createOrderURL, params, httpOptions)
      .map((response: Response) => {
        if (response.success) {
          return response.data[0] as Order;
        }
        else {
          return null;
        }
      });
  }

  isExistOrderByCart(id: string): Observable<boolean> {
    // to check if user has cart and order.
    const loginURL = this.basicURL + "cart/" + id;
    console.log("OrdersService: isExistOrderByCart - check if has order by cart with URL", loginURL);
    return this.http.get<Response>(loginURL).
      map(
        (response: Response) => {
          console.log("OrdersService: isExistOrderByCart - returned data", response);
          if (response.success) {
            return true;
          }
          else {
            return false;
          }
        });
  }
}
