import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';
import { CartService } from '../cart.service';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  user: User = null;
  isHasCart: boolean = false;
  category: string;
  cart: Cart;
  currentCartItems: DetailsItem[];
  isShowOrder: boolean = false;
  isDisplayCart: boolean = true;
  userLogged = localStorage.getItem('loggedUser');

  constructor(private userService: UserService, private cartItemsService: CartItemService, private cartService: CartService, private router: Router) {
    //check if session active

    this.userService.checkSession().subscribe((boolRes) => {
      if (!boolRes) {
        console.log('login required');
        if (this.userLogged != undefined) {
          localStorage.removeItem('loggedUser');
        }
        this.router.navigate(['home']);
      }

    });

    this.userService.user$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          this.isHasCart = false;
        }
        else {
          this.user = data[0];
          console.log("shop: subscribe to User - returned from service", this.user);
        }
        console.log("CartComponent: subscribe to User - does user have cart?", this.isHasCart);
      },
      error => {
        console.error(`login: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );


  }

  ngOnInit() {
    this.cartService.cart$.subscribe(
      data => {
        if (data != null) {
          this.cart = data;
          console.log("ShopComponent: subscribe to Cart - returned from service", data);
          this.cartItemsService.getItems(data.id.toString());
        }
        else {
          console.log("ShopComponent: subscribe to Cart - user doesn't have cart");
          //create cart for user
          if (!this.isHasCart && (this.user != null || this.user != undefined)) {
            let newCart = new Cart();
            newCart.creation_date = new Date();
            newCart.user_id = this.user.id;
            this.cartService.createCart(newCart);
          }
        }
      },
      error => {
        console.error(`ShopComponent: subscribe to Cart - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );
    console.log("shop on init");
  }

  displayProducts(category) {
    console.log("ShopComponent: displayProducts - selectedCategory was emitted in parent")
    this.category = category;
  }

  cartItemsReport(items: DetailsItem[]) {
    this.currentCartItems = items;
  }

  showOrder(isShowOrder: boolean) {
    this.isShowOrder = isShowOrder;
  }
}
