import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';
import { CategoryService, Category } from '../category.service';
import { HttpHeaders } from '@angular/common/http';
import { Product } from '../product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

/**
 * This component will display the form for product creation and update.
 * by default it will display empty or defaulted values.
 * if Input is received for product ID then the form will get the product 
 * from the DB and display its values.
 * @author Yossi Even
 * 
 */
export class ProductFormComponent implements OnInit {
  product: Product;
  categoryError = false;
  isValidImage = true;
  displayImage: String;
  categories: Category[];
  fileToUpload: File = null;
  @ViewChild('fileName') fileName: ElementRef;
  @Output() retrieveAllCategories: EventEmitter<boolean> = new EventEmitter();
  defaultImage: string = 'http://localhost:3000/assets/images/1550345768682ring.png';

  constructor(private categoryService: CategoryService, private productService: ProductsService) {

    this.categoryService.getCategories('');
    console.log("getting categories...");
    this.categoryService.categories$.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    );

    this.productService.productToEdit$.subscribe(
      data => {
        if (data == null || data == undefined) {
          this.initializeProduct();
        }
        else {
          this.product = data;
          this.displayImage = "http://localhost:3000/assets/images/" + this.product.image;
        }
      },
      error => console.error("Error in retrieving product to edit: ", error)
    );

  }


  ngOnInit() {

  }

  /**
   * triggers when file is chosen. 
   * Resets the image preview and then
   * will display file name in customized label
   * and will show preview of image.
   * @param file 
   */
  onFileChange(file: File) {
    console.log("onFileChange - my product is", this.product);
    this.product.image = "";
    if (file) {
      this.fileName.nativeElement.innerText = file.name
      this.fileToUpload = file;
      console.log("file type", file.type.split("/", 1));

      if (file.type.split("/", 1)[0] === "image") {
        this.isValidImage = true;
        var reader = new FileReader();
        //this.imagePath = files;
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = (_event) => {
          console.log("_event", _event);
          this.product.image = _event.target["result"];
          this.displayImage = this.product.image;
          console.log("product.image", this.product.image);
        }
      }
      else {
        this.isValidImage = false;
      }
    }
  }

  /**
   * make sure category is selected.
   * @param value 
   */
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

  /**
   * executed on submit.
   * prepare input for create or update service.
   * in case of update we don't load the image property
   * as it is coming as binary data and may conflict with 
   * the FormData image.
   * 
   */
  async createUpdateProduct() {

    console.log("createUpdateProduct - my product is", this.product);
    let fd = new FormData();
    if (this.fileToUpload != null) {
      console.log("uploaded file", this.fileToUpload.name);
      fd.append("image", this.fileToUpload, this.fileToUpload.name);
    }
    else {

    }
    for (var key in this.product) {
      if (key !== 'image') {
        fd.append(key, this.product[key]);
      }
    }
    console.log("ProductFormComponent: createUpdateProduct - updating product", this.product);
    this.productService.updateProduct(fd).subscribe(response => {
      console.log("ProductFormComponent: createUpdateProduct - done updating product", this.product);
      this.initializeProduct();
      this.productService.getProducts('');
      this.retrieveAllCategories.emit(true);
      this.productService.productToEdit$.next(response);
    });;
  }

  initializeProduct() {
    this.product = {
      id: 0,
      name: "",
      category: 0,
      price: 0,
      image: ""
    };
    this.displayImage = "";
  }
}
