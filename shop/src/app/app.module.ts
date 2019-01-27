import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMinDirective } from './custom-min.directive';
import { CategoryService } from './category.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductFormComponent,
    CustomMinDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
