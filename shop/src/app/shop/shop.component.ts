import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Cart } from '../cart';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';

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

  constructor(private userService: UserService, private cartItemsService: CartItemService, private router: Router) {
    //check if session active
    this.userService.checkSession().subscribe((boolRes) => {
      if (!boolRes) {
        console.log('login required');
        if (localStorage.getItem('loggedUser') != undefined) {
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
          this.userService.isUserHasActiveCart(data[0].id).subscribe((boolRes) => {
            this.isHasCart = boolRes;
          });
        }
        console.log("CartComponent: subscribe to User - does user have cart?", this.isHasCart);
      },
      error => {
        console.error(`login: subscribe to User - Error in retrieving user : `, error.message);
        this.isHasCart = false;

      }
    );

    this.userService.userCart$.subscribe(
      data => {
        if (data != null) {
          this.cart = data;
          console.log("ShopComponent: subscribe to Cart - returned from service", data);
          this.cartItemsService.getItems(data.id.toString());
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
  }

  ngOnInit() {

  }

  displayProducts(category) {
    console.log("ShopComponent: displayProducts - selectedCategory was emitted in parent")
    this.category = category;
  }

  cartItemsReport(items: DetailsItem[]) {
    this.currentCartItems = items;
  }
}
