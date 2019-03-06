import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { BehaviorSubject } from 'rxjs/RX';
import { Product } from '../product';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public myProducts: Product[];
  constructor(private productService: ProductsService) {
    this.productService.products$.subscribe({
      next: (data) => {
        this.myProducts = data;
        console.log("main: subscribe to products - products", this.myProducts);
      },
      error: (err) => console.log('observerb:' + err),
      complete: () => console.log('observerc:')
    });
  }

  ngOnInit() {
    const id = '';

    this.productService.getProducts('');

  }

}
