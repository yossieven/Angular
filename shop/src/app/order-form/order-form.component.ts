import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Cities } from '../cities';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { OrdersService, Response } from '../orders.service';
import { Order } from '../order';
import { Cart } from '../cart';
import { CartItem } from '../cart-item';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';
import { CartService } from '../cart.service';

export interface DateHashMap {
  [date: string]: number;
}

export class FormModel {
  city: string
  street: string
  shipDate: Date
  credit: string
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnChanges {

  user: User;
  @ViewChild('orderForm1') orderForm: NgForm;
  @ViewChild('shipDate', { read: ElementRef }) shipDateRef: ElementRef;
  listOfCities = new Cities();
  formModel: FormModel = new FormModel();
  ordersSubscription: Subscription;
  orderDatesHash: DateHashMap = {};
  lookupDate: string;
  disabledDates: Date[] = [];
  orderToCreate: Order;
  @Input() cart: Cart;
  cartItems: DetailsItem[];
  showOrderedModal: boolean;
  minDate: Date;




  constructor(private userService: UserService, private datePipe: DatePipe, private orderService: OrdersService,
    private cartService: CartService, private cartItemService: CartItemService) {
    this.showOrderedModal = false;

    this.userService.user$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          console.log("no user logged in");
        }
        else {
          this.user = data[0];
          console.log("OrderFormComponent: subscribe to User - returned from service", data[0]);
        }
      },
      error => {
        console.error(`OrderFormComponent: subscribe to User - Error in retrieving user : `, error.message);
      }
    );

    this.cartItemService.items$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          console.log("OrderFormComponent: subscribe to items - no items");
        }
        else {
          this.cartItems = data;
          console.log("OrderFormComponent: subscribe to items - returned from service", this.cartItems);
        }

      },
      error => {
        console.error(`OrderFormComponent: subscribe to User - Error in retrieving items : `, error.message);


      }
    );

    this.ordersSubscription = this.orderService.getAllOrders().subscribe((response: Response) => {
      console.log("OrderFormComponent: subcribe to all orders");
      response.data.forEach(element => {
        this.lookupDate = this.datePipe.transform(element.shipping_date, 'yyyy-MM-dd');
        if (this.orderDatesHash != undefined && this.orderDatesHash[this.lookupDate] > 0) {
          // this.orderDatesHash[this.lookupDate]
          this.orderDatesHash[this.lookupDate]++;
        }
        else {
          this.orderDatesHash[this.lookupDate] = 1;
        }

      });
      Object.keys(this.orderDatesHash).forEach(element => {
        if (this.orderDatesHash[element] >= 3) {
          this.disabledDates.push(new Date(element));
        }
      });
    });

    this.formModel.credit = "";


    this.minDate = new Date();

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("changes");
  }

  ngOnInit() {

  }

  fillInTheBlanks(input) {
    switch (input.name) {
      case "orderCity":
        this.formModel.city = this.user.city;
        break;
      case "orderStreet":
        this.formModel.street = this.user.street;
        break;
      case "orderDate":
        const today = new Date();
        this.formModel.shipDate = today;
        break;

    }

  }

  onDateChange(event) {
    this.disabledDates.forEach(element => {
      if (this.datePipe.transform(element, 'MM/dd/yyyy') == event) {
        this.orderForm.controls.orderDate.setErrors({ invalidDate: true });

      }
    });

  }
  validateShippingDate(): boolean {
    let isValid: boolean = true;
    if (this.shipDateRef.nativeElement.value <= this.datePipe.transform(this.minDate, 'MM/dd/yyyy')) {
      this.orderForm.controls.orderDate.setErrors({ invalidDate: true });
      return false;
    }
    this.disabledDates.forEach(element => {
      if (this.datePipe.transform(element, 'MM/dd/yyyy') == this.shipDateRef.nativeElement.value) {
        this.orderForm.controls.orderDate.setErrors({ invalidDate: true });
        isValid = false;
      }
    });
    return isValid;
  }

  createOrder() {
    if (!this.validateShippingDate()) {
      return;
    }
    let totalCartPrice = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    totalCartPrice = Math.round(totalCartPrice * 100) / 100;

    this.orderToCreate = new Order();
    this.orderToCreate.user_id = this.user.id;
    this.orderToCreate.cart_id = this.cart.id;
    this.orderToCreate.total = totalCartPrice;
    this.orderToCreate.city = this.formModel.city;
    this.orderToCreate.street = this.formModel.street;
    this.orderToCreate.last_four = this.formModel.credit.substr(this.formModel.credit.length - 4, this.formModel.credit.length);
    this.orderToCreate.creation_date = new Date();
    this.orderToCreate.shipping_date = this.formModel.shipDate;

    this.orderService.createOrder(this.orderToCreate).subscribe(response => {
      if (response == null) {
        console.log("OrderFormComponent: createOrder - there was a problem in creating order!");
        // remove cart
      }
      else {
        this.showOrderedModal = true;
      }
    });
  }

  closeModal(isClosed: boolean) {
    this.showOrderedModal = !isClosed;
  }

}
