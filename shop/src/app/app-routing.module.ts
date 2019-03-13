import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth.guard';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
