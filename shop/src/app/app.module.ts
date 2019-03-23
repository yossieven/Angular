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
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommercialComponent } from './commercial/commercial.component';
import { RegisterComponent } from './register/register.component';
import { MustMatchDirective } from './must-match.directive';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth.guard';
import { UtilitiesService } from './utilities.service';
import { CategoryNavbarComponent } from './category-navbar/category-navbar.component';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './item/item.component';
import { QuantityModalComponent } from './quantity-modal/quantity-modal.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from '../../node_modules/ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductFormComponent,
    CustomMinDirective,
    LoginComponent,
    ShopInfoComponent,
    NavbarComponent,
    CommercialComponent,
    RegisterComponent,
    MustMatchDirective,
    ShopComponent,
    CategoryNavbarComponent,
    CartComponent,
    ItemComponent,
    QuantityModalComponent,
    OrderFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [ProductsService, CategoryService, UserService, AuthGuard, UtilitiesService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
