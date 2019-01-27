import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Response } from './products.service';
import { BehaviorSubject } from 'rxjs/Rx';

export interface Category {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories = new BehaviorSubject<Category[]>([]);
  constructor(private http: HttpClient) { }

  async getCategories(specific: string) {
    const basicURL = 'http://localhost:3000/api/categories/';
    const params = specific || '';
    const finalURL = basicURL + params;
    console.log("URL", finalURL);
    const response = await this.http.get(finalURL);
    console.log(response);

    // console.log("products", this.products);
    this.http.get(finalURL).pipe(
      map(
        (response: Response) => {
          console.log("categories response = ", response.data);
          return response.data;

        })).subscribe(response => this.categories.next(response))
  }
}
