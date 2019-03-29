import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { BehaviorSubject, Subscription } from 'rxjs/RX';
import { Product } from '../product';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public myProducts: Product[];
  productSubscription: Subscription;
  userLogged = localStorage.getItem('loggedUser');

  constructor(private productService: ProductsService, private userService: UserService, private cartService: CartService) {
    if (this.userLogged != undefined) {
      this.userService.checkSession().subscribe(res => {
        if (res) {
          this.userService.getUser(this.userLogged);
          //this.cartService.isUserHasActiveCart(this.userLogged).subscribe();
        }
      })
    }
    this.productSubscription = this.productService.products$.subscribe({
      next: (data) => {
        this.myProducts = data;
        console.log("main: subscribe to products - products", this.myProducts);
      },
      error: (err) => console.log('main: subscribe to products:' + err),
      complete: () => console.log('main: subscribe to products: completed')
    });
  }

  ngOnInit() {
    this.productService.getProducts('');
    window.addEventListener("beforeunload", function (e) {
      //localStorage.removeItem('loggedUser');
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
