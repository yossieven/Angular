import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { CartItemService } from '../cart-item.service';
import { CartItem } from '../cart-item';
import { Cart } from '../cart';
import { DetailsItem } from '../details-item';

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

  constructor(private userService: UserService, private cartItemsService: CartItemService) {
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
        }
        else {
          this.items = data;
          console.log("CartComponent: subscribe to items - returned from service", this.items);
          this.isHasItems = true;
        }
        console.log("CartComponent: subscribe to User - does user have items?", this.isHasItems);
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
