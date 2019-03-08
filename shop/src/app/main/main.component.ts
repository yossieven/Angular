import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { BehaviorSubject } from 'rxjs/RX';
import { Product } from '../product';
import { UserService } from '../user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public myProducts: Product[];
  constructor(private productService: ProductsService, private userService: UserService) {
    if (localStorage.getItem('loggedUser') != undefined) {
      this.userService.getUser(localStorage.getItem('loggedUser'));
      this.userService.isUserHasActiveCart(localStorage.getItem('loggedUser')).subscribe(res => {
        console.log("user has cart? ", res);
      });
    }
    this.productService.products$.subscribe({
      next: (data) => {
        this.myProducts = data;
        console.log("main: subscribe to products - products", this.myProducts);
      },
      error: (err) => console.log('observerb:' + err),
      complete: () => console.log('observerc:')
    });
  }

  ngOnInit() {
    const id = '';

    this.productService.getProducts('');

  }

}
