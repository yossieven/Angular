import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { CategoryService, Category } from '../category.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    id: 0,
    name: "",
    category: 0,
    price: 0,
    image: ""
  };

  categoryError = false;
  isValidImage = true;
  categories: Category[];
  fileToUpload: File = null;


  @Input() productId;

  @ViewChild('fileName')
  fileName: ElementRef;

  constructor(private categoryService: CategoryService, private productService: ProductsService) {
    // this.productService.products.subscribe(
    //   data => this.product = data[0],
    //   error => console.error(`Error in retrieving product ${this.productId}`, error)
    // );
  }

  /**
   * load all categories and if ID is given load the product from DB.
   */
  ngOnInit() {
    this.categoryService.getCategories('');
    console.log("getting categories...");
    this.categoryService.categories.subscribe(
      data => this.categories = data,
      error => console.error("Error in retrieving categories: ", error)
    );
    this.productId = 8;
    if (this.productId) {
      this.getProductForUpdate(this.productId);
    }

  }

  async getProductForUpdate(id) {
    this.productService.products.subscribe(
      data => this.product = data[0],
      error => console.error(`Error in retrieving product ${id}`, error)
    );
    await this.productService.getProducts(id);

    console.log("my product", this.product);
  }

  /**
   * triggers when file is chosen. 
   * Resets the image preview and then
   * will display file name in customized label
   * and will show preview of image.
   * @param file 
   */
  onFileChange(file: File) {
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

  createUpdateProduct() {
    let fd = new FormData();
    console.log("uploaded file", this.fileToUpload);
    fd.append("image", this.fileToUpload, this.fileToUpload.name);
    for (var key in this.product) {
      fd.append(key, this.product[key]);
    }

    if (this.productId) {
      // update product PUT
      // this.productService.products.subscribe(
      //   data => this.product = data[0],
      //   error => console.error(`Error in updating product ${this.productId}`, error)
      // );
      this.productService.updateProduct(fd);
    }
    else {
      // create new product POST
    }
  }
}
