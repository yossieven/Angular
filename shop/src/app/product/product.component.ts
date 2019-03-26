import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() showQuantityModal: EventEmitter<Product> = new EventEmitter();
  @Input() isEdit: boolean;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    console.log("ProductComponent: ngOnInit - product is", this.product);
  }

  addToCart(product: Product) {
    console.log("ProductComponent: addToCart - emitting product", product);
    this.showQuantityModal.emit(product);
  }

  editProduct(product: Product) {
    const aProduct = { ...product };
    this.productService.setProductToEdit(aProduct);
  }
}
