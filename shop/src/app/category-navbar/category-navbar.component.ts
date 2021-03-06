import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { CategoryService, Category } from '../category.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit, OnChanges {

  categories: Category[];
  @Input() activeCategoryId: number;
  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();
  @Input() isViewOnly: boolean;

  constructor(private categoryService: CategoryService, private productService: ProductsService) {
    this.categoryService.getCategories('');
    this.categoryService.categories$.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    );
  }

  ngOnInit() {
    this.retrieveCategoryProducts('1');
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    console.log("CategoryNavbarComponent: ngOnChanges - returnd selected category", changes);
  }

  retrieveCategoryProducts(id) {
    console.log("CategoryNavbarComponent: retrieveCategoryProducts - emitting selectedCategory");
    this.activeCategoryId = id;
    this.selectedCategory.emit(id);

  }

  lookupProduct(value: any) {
    console.log("CategoryNavbarComponent: lookupProduct - lookup value", value);
    if (value.lookupProduct == '') {
      this.productService.getProducts('');
    }
    else {
      this.productService.getProductByName(value.lookupProduct);
    }
    this.activeCategoryId = 1;
  }
}
