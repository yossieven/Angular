import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OrdersService, Response } from '../orders.service';
import { Order } from '../order';
import { UserService } from '../user.service';
import { Cart } from '../cart';
import { User } from '../user';


@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {

  numberOfProducts = 0;
  numberOfOrders = 0;
  hasOpenCart = false;
  user: User = null;
  cart: Cart = null;
  userOrder: Order = null;
  orders: Order[] = [];

  constructor(private productService: ProductsService, private orderService: OrdersService, private userService: UserService) {
    this.productService.products$.subscribe({
      next: (data) => {
        console.log("shop-info: subscribed to products");
        this.numberOfProducts = data.length
      },
      error: (err) => console.log('shop-info: observerb:' + err),
      complete: () => console.log('shop-info: observerc:')
    });

    this.orderService.getAllOrders().subscribe((response: Response) => {
      console.log("shop-info: subcribe to all orders");
      this.numberOfOrders = response.data.length
      this.orders = response.data;
    });

    this.userService.userCart$.subscribe({
      next: (data) => {
        if (data != null) {
          this.hasOpenCart = true;
          this.cart = data
        }
        else {
          this.hasOpenCart = false;
          this.cart = null;
        }
        console.log("shop-info: subscribed to user cart", this.cart);
      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });

    this.userService.user$.subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.user = data[0];
          console.log("shop-info: subscribed to user ID", this.user.id);
          console.log("shop-info: number of orders when user changed ", this.numberOfOrders);
          this.userOrder = this.orders.find(order => order.user_id == this.user.id);
        }
        else {
          this.userOrder = null;
        }
      },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
  }

}