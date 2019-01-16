import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../products.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    const id = '';
    this.productService.getProducts(id);
    this.productService.products.subscribe((data) => {
      console.log("data", data);
    });
  }

}
