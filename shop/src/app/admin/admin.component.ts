import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  category: string;

  constructor() { }

  ngOnInit() {
  }

  displayProducts(category) {
    console.log("ShopComponent: displayProducts - selectedCategory was emitted in parent")
    this.category = category;
  }

  // triggerCategoryNav(isTrigger: boolean) {
  //   this.displayProducts('1');
  // }

}
