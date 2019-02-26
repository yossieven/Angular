import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OrdersService, Response } from '../orders.service';
import { Order } from '../order';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user.service';
import { Cart } from '../cart';


@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {

  numberOfProducts = 0;
  numberOfOrders = 0;
  hasOpenCart = false;
  userId: string;
  cart: Cart;

  constructor(private productService: ProductsService, private orderService: OrdersService, private userService: UserService) {
    this.userService.userCart$.subscribe({
      next: (data) => { if (data != null) { this.hasOpenCart = true; this.cart = data }; console.log("shop-info: has cart", this.cart); },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });

    this.userService.user$.subscribe({
      next: (data) => { if (data.length > 0) { this.userId = data[0].id; console.log("shop-info: user ID", this.userId) } },
      error: (err) => console.log('shop-info: observer shop info:' + err),
      complete: () => console.log('shop-info: observer shop info complete')
    });
  }

  ngOnInit() {
    // this.productService.getProducts("");
    this.productService.products$.subscribe({
      next: (data) => this.numberOfProducts = data.length,
      error: (err) => console.log('shop-info: observerb:' + err),
      complete: () => console.log('shop-info: observerc:')
    });

    this.orderService.getAllOrders().subscribe((response: Response) => this.numberOfOrders = response.data.length);


  }

}
