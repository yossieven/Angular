import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { CategoryService, Category } from '../category.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product;

  categoryError = false;
  categories: Category[];
  fileToUpload: File = null;


  @ViewChild('fileName')
  fileName: ElementRef;

  constructor(private categoryService: CategoryService, private productService: ProductsService) { }

  ngOnInit() {
    this.categoryService.getCategories('');
    console.log("getting categories...");
    this.categoryService.categories.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    );
    this.getProductForUpdate('1');
  }

  async getProductForUpdate(id) {
    this.productService.products.subscribe(
      data => this.product = data[0],
      error => console.error(`Error in retrieving product ${id}`, error)
    );
    await this.productService.getProducts(id);

    console.log("my product", this.product);
  }

  onFileChange(file: File) {
    console.log("file", file);
    this.fileName.nativeElement.innerText = file.name
    this.fileToUpload = file;
    console.log("file", this.fileToUpload);

    var reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (_event) => {
      this.product.image = reader.result + '';
      console.log("product.image", this.product.image);
    }
  }

  validateCategory(value) {
    console.log("checking category", value);
    if (value == 0) {
      this.categoryError = true;
    }
    else {
      this.categoryError = false;
    }
    console.log("this.categoryError = ", this.categoryError);
  }
}
