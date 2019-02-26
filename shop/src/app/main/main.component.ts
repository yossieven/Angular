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
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    const id = '';
    this.productService.getProducts('');
    this.productService.products$.subscribe({
      next: (data) => this.myProducts = data,
      error: (err) => console.log('observerb:' + err),
      complete: () => console.log('observerc:')
    });
  }

}
