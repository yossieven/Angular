import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() showQuantityModal: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    console.log("ProductComponent: addToCart - emitting product", product);
    this.showQuantityModal.emit(product);
  }
}
