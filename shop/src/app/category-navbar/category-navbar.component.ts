import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categories: Category[];
  activeCategoryId: number;
  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories('');
    this.categoryService.categories$.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    );
  }

  ngOnInit() {
    this.retrieveCategoryProducts('1');
  }

  retrieveCategoryProducts(id) {
    console.log("CategoryNavbarComponent: retrieveCategoryProducts - emitting selectedCategory");
    this.activeCategoryId = id;
    this.selectedCategory.emit(id);

  }

  lookupProduct(value: any) {

  }
}
