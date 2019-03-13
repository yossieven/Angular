import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Product } from './product';


export interface Response {
  success: boolean,
  data: Product[]
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products$ = new BehaviorSubject<Product[]>([]);
  private basicURL = 'http://localhost:3000/api/products/';

  constructor(private http: HttpClient) {

  }

  async getProducts(specific: string) {

    const params = specific || '';
    const finalURL = this.basicURL + params;
    console.log("URL", finalURL);

    const httpOptions = {
      withCredentials: true
    };
    // console.log("products", this.products$);
    await this.http.get(finalURL, httpOptions).pipe(
      map(
        (response: Response) => {
          console.log("ProductsService: getProducts - returned data", response);
          //response.data[0].image = 'http://localhost:3000/assets/images/' + response.data[0].image;
          return response.data;

        })).subscribe(response => this.products$.next(response))
  }

  async getProductByName(name: string) {
    const finalURL = this.basicURL + 'name/' + name;
    console.log("URL", finalURL);

    const httpOptions = {
      withCredentials: true
    };
    // console.log("products", this.products$);
    await this.http.get(finalURL, httpOptions).pipe(
      map(
        (response: Response) => {
          console.log("ProductsService: getProductByName - returned data", response);
          return response.data;

        })).subscribe(response => this.products$.next(response))
  }

  async getProductsByCategory(category: string) {

    if (category == '1') {
      this.getProducts('');

    }
    else {
      const finalURL = this.basicURL + 'category/' + category;
      console.log("URL", finalURL);

      const httpOptions = {
        withCredentials: true
      };
      // console.log("products", this.products$);
      await this.http.get(finalURL, httpOptions).pipe(
        map(
          (response: Response) => {
            console.log("returned data", response);
            //response.data[0].image = 'http://localhost:3000/assets/images/' + response.data[0].image;
            return response.data;

          })).subscribe(response => this.products$.next(response))
    }
  }

  /**
   * This method will call POST rest URL for creation or update
   * depending whether ID was given or not.
   * @param fd 
   */
  async updateProduct(fd) {

    let updateURL = this.basicURL;

    if (fd.get('id') != 0) {
      updateURL += fd.get('id');
    }

    console.log('Updated URL is ', updateURL);
    await this.http.post(updateURL, fd)
      .pipe(
        map(
          (response: Response) => {
            console.log("returned data", response);
            return response.data;
          }))
      .subscribe(response => {
        this.products$.next(response);
      });
  }
}
