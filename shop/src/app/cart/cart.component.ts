import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { CartItemService } from '../cart-item.service';
import { CartItem } from '../cart-item';
import { Cart } from '../cart';
import { DetailsItem } from '../details-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isHasCart: boolean = false;
  isHasItems: boolean = true;
  items: DetailsItem[];
  user: User;
  @Input() cart: Cart;
  @Input() isInOrder: boolean
  @Output() cartItems: EventEmitter<DetailsItem[]> = new EventEmitter(); //send current items in cart to shop
  @Output() showOrder: EventEmitter<boolean> = new EventEmitter();
  totalCartPrice: number;
  isViewOnly: boolean = false;


  constructor(private userService: UserService, private cartItemsService: CartItemService, private router: Router) {
    this.userService.user$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          this.isHasCart = false;
        }
        else {
          this.user = data[0];
          console.log("CartComponent: subscribe to User - returned from service", data[0]);
        }
      },
      error => {
        console.error(`CartComponent: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;
      }
    );

    this.cartItemsService.items$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          this.isHasItems = false;
          this.items = null;
        }
        else {
          this.items = data;
          console.log("CartComponent: subscribe to items - returned from service", this.items);
          this.isHasItems = true;
          this.totalCartPrice = this.items.reduce((sum, item) => sum + item.total, 0);
          this.totalCartPrice = Math.round(this.totalCartPrice * 100) / 100
        }
        this.cartItems.emit(this.items);
        console.log("CartComponent: subscribe to Items - does user have items?", this.isHasItems);
      },
      error => {
        console.error(`CartComponent: subscribe to Items - Error in retrieving items : `, error.message);
        this.isHasCart = false;

      }
    );
  }

  ngOnInit() {
    console.log("CartComponent: ngOnInit() - isViewOnly", this.isViewOnly);
    if (this.isInOrder) {
      this.isViewOnly = true;
    }
    else {
      this.isViewOnly = false;
    }
  }

  order() {
    this.isViewOnly = true;
    console.log("CartComponent: order() - isViewOnly", this.isViewOnly);
    this.showOrder.emit(true);
  }

  backToShop() {
    this.isViewOnly = false;
    this.showOrder.emit(false);
  }
}
