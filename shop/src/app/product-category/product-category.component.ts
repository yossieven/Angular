import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../products.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  public myProducts: Product[];
  constructor(private productService: ProductsService) { }

  ngOnInit() {

    const id = '';
    this.productService.getProducts(id);
    this.productService.products.subscribe({
      next: (data) => this.myProducts = data,
      error: (err) => console.log('observerb:' + err),
      complete: () => console.log('observerc:')
    });
  }


}
