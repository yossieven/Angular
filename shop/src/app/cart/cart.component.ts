import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { CartItemService } from '../cart-item.service';
import { CartItem } from '../cart-item';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isHasCart: boolean = false;
  isNoItems: boolean = true;
  items: CartItem[];
  user: User;
  cart: Cart;

  constructor(private userService: UserService, private cartItemsService: CartItemService) {
    this.userService.user$.subscribe(
      data => {
        if (data == null) {
          this.isHasCart = false;
        }
        else {
          this.user = data[0];
          console.log("CartComponent: subscribe to User - returned from service", this.user);
          this.isHasCart = this.userService.isUserHasCart;
        }
        console.log("CartComponent: subscribe to User - does user have cart?", this.isHasCart);
      },
      error => {
        console.error(`CartComponent: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );

    this.userService.userCart$.subscribe(
      data => {
        if (data != null) {
          this.cart = data[0];
          console.log("CartComponent: subscribe to Cart - returned from service", this.cart);
          this.cartItemsService.getItems(this.cart.id.toString());
        }
        else {
          console.log("user doesn't have cart");
        }
      },
      error => {
        console.error(`CartComponent: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );

    this.cartItemsService.items$.subscribe(
      data => {
        if (data == null) {
          this.isNoItems = true;
        }
        else {
          this.items = data;
          console.log("CartComponent: subscribe to items - returned from service", this.items);
          this.isNoItems = false;
        }
        console.log("CartComponent: subscribe to User - does user have items?", this.isNoItems);
      },
      error => {
        console.error(`CartComponent: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );
  }

  ngOnInit() {
  }

}
