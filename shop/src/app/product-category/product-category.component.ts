import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnChanges {


  public myProducts: Product[];
  constructor(private productService: ProductsService) { }
  @Input() selectedCategory: string;
  showQuantityModal: boolean = false;
  selectedProduct: Product;

  ngOnInit() {

    const id = this.selectedCategory;
    this.productService.getProductsByCategory(id);
    this.productService.products$.subscribe({
      next: (data) => this.myProducts = data,
      error: (err) => console.log('observerb:' + err),
      complete: () => console.log('observerc:')
    });
  }

  displayQuantityModal(product: Product) {
    console.log("ProductCategoryComponent: displayQuantityModal - received product", product);
    this.selectedProduct = product;
    this.showQuantityModal = true;

  }

  closeModal(isClose: boolean) {
    console.log("ProductCategoryComponent: closeModal - received closeModal", isClose);
    this.showQuantityModal = !isClose;
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("ProductCategoryComponent: ngOnChanges - changes are ", changes);
    console.log("ProductCategoryComponent: ngOnChanges - value of input is ", this.selectedCategory);
    this.productService.getProductsByCategory(this.selectedCategory);
  }

  addToCart(quantity: number) {

  }

}
