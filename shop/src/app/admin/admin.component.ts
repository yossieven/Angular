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
    console.log("AdminComponent: displayProducts - selectedCategory was emitted in parent")
    this.category = category;
  }

  triggerCategoryNav(isTrigger: boolean) {
    console.log("AdminComponent: triggerCategoryNav - returnd selected category");
    this.displayProducts('1');
  }

}
