import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';

export interface Product {
  id: number,
  name: string,
  category: number,
  price: number,
  image: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: Product[];

  constructor(private http: HttpClient) {

  }

  getProducts(specific: string) {
    const basicURL = 'http://localhost:3000/api/products/';
    const params = specific || '';
    const finalURL = basicURL + params;
    console.log("URL", finalURL);
    return this.http.get<Product[]>("http://localhost:3000/products/").do(console.log);
    console.log("products", products);
    // this.http.get(finalURL).pipe(
    //   map(
    //     (response: Product[]) => {
    //       console.log("response", response);
    //       this.products.next(response);
    //       return response;
    //     })
    // )
  }
}
