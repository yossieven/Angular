import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private basicURL = 'http://localhost:3000/api/products/';

  constructor(private http: HttpClient) {

  }

  async getProducts(specific: string) {

    const params = specific || '';
    const finalURL = this.basicURL + params;
    console.log("URL", finalURL);


    // console.log("products", this.products);
    await this.http.get(finalURL).pipe(
      map(
        (response: Response) => {
          console.log("returned data", response);
          response.data[0].image = 'http://localhost:3000/assets/images/' + response.data[0].image;
          return response.data;

        })).subscribe(response => this.products.next(response))
  }

  updateProduct(fd) {
    let httpHeaders = new HttpHeaders();
    httpHeaders.append('Access-Control-Allow-Origin', '*');

    let options = {
      headers: httpHeaders
    };
    const updateURL = this.basicURL + fd.get('id');
    console.log('Updated URL is ', updateURL);
    this.http.post(updateURL, fd, options).pipe(
      map(
        (response: Response) => {
          console.log("returned data", response);
          return response.data;
        })).subscribe(response => this.products.next(response))
  }
}
