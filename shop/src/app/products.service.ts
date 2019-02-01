import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { map, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';

export interface Product {
  id: number,
  name: string,
  category: number,
  price: number,
  image: string
}

export interface Response {
  success: boolean,
  data: Product[]
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {

  }

  async getProducts(specific: string) {
    const basicURL = 'http://localhost:3000/api/products/';
    const params = specific || '';
    const finalURL = basicURL + params;
    console.log("URL", finalURL);

    // console.log("products", this.products);
    await this.http.get(finalURL).pipe(
      map(
        (response: Response) => {
          console.log("returned data", response);
          return response.data;

        })).subscribe(response => this.products.next(response))
  }
}
