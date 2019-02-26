import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';
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
}
