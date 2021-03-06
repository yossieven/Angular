import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartItemService } from '../cart-item.service';
import { CartItem } from '../cart-item';
import { Cart } from '../cart';
import { DetailsItem } from '../details-item';
import { nextContext } from '@angular/core/src/render3';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit, OnChanges {


  public myProducts: Product[];
  constructor(private productService: ProductsService, private cartItemService: CartItemService) { }
  @Input() selectedCategory: string;
  @Input() cart: Cart;
  @Input() cartItems: DetailsItem[];
  showQuantityModal: boolean = false;
  selectedProduct: Product;
  @Input() isEdit: boolean;

  ngOnInit() {

    const id = this.selectedCategory;
    this.productService.getProductsByCategory(id);
    this.productService.products$.subscribe({
      next: (data) => {
        this.myProducts = data;
        console.log("ProductCategoryComponent: ngOnInit - myProducts", this.myProducts);
      },
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
    console.log("ProductCategoryComponent: ngOnChanges - value of input selected category is ", this.selectedCategory);
    console.log("ProductCategoryComponent: ngOnChanges - value of input cart is ", this.cart);
    this.productService.getProductsByCategory(this.selectedCategory);
  }

  addToCart(quantity: number) {
    console.log("ProductCategoryComponent: addToCart - got quantity", quantity);
    console.log("this cartItems", this.cartItems);
    let itemToAdd = new CartItem();
    itemToAdd.cart_id = this.cart.id;
    itemToAdd.amount = quantity;
    itemToAdd.product_id = this.selectedProduct.id;
    itemToAdd.total = quantity * this.selectedProduct.price;
    let isFoundMatch: boolean = false;
    if (this.cartItems != null && this.cartItems != undefined) {
      this.cartItems.forEach((item) => {
        if (item.product_id == itemToAdd.product_id) {
          itemToAdd.amount = +itemToAdd.amount + +item.amount;
          itemToAdd.total = itemToAdd.amount * this.selectedProduct.price;
          itemToAdd.id = item.id;
          isFoundMatch = true;
          this.cartItemService.updateItem(itemToAdd);
        }
      })
    }
    if (!isFoundMatch) {
      this.cartItemService.addItemToCart(itemToAdd);
    }
  }


}
