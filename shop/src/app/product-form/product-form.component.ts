import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../products.service';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 1,
    name: "Yossi",
    category: 0,
    price: 10.2,
    image: "myImageFile"
  }

  categoryError = false;
  categories: Category[];
  fileToUpload: File = null;

  @ViewChild('fileName')
  fileName: ElementRef;

  constructor(private service: CategoryService) { }

  ngOnInit() {
    this.service.getCategories('');
    console.log("getting categories...");
    this.service.categories.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    )
  }

  onFileChange(file: File) {
    this.fileName.nativeElement.innerText = file.name
    this.fileToUpload = file;
    console.log("file", this.fileToUpload);
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
