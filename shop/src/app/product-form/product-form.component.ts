import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductCategoryComponent } from '../product-category/product-category.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  fileToUpload: File = null;

  @ViewChild('fileName')
  fileName: ElementRef;

  constructor() { }

  ngOnInit() {
    this.productForm = new FormGroup({
      pName: new FormControl(),
      pPrice: new FormControl(),
      pCategory: new FormControl(),
      pImage: new FormControl()
    })
  }

  onFileChange(file: File) {
    this.fileName.nativeElement.innerText = file.name
    this.fileToUpload = file;
    console.log("file", this.fileToUpload);
  }

}
