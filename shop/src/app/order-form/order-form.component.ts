import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Cities } from '../cities';
import { DatePipe } from '@angular/common';

export class FormModel {
  city: string
  street: string
  shipDate: string
  credit: string
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  user: User;
  @ViewChild('orderForm1') orderForm: NgForm;
  @ViewChild('shipDate') shipDateRef: ElementRef;
  listOfCities = new Cities();
  formModel: FormModel = new FormModel();

  constructor(private userService: UserService, private datePipe: DatePipe) {
    this.userService.user$.subscribe(
      data => {
        if (data == null || data.length == 0) {
          console.log("no user logged in");
        }
        else {
          this.user = data[0];
          console.log("CartComponent: subscribe to User - returned from service", data[0]);
        }
      },
      error => {
        console.error(`CartComponent: subscribe to User - Error in retrieving user : `, error.message);
      }
    );

    const today = new Date();

    this.formModel.city = this.user.city;
    this.formModel.street = this.user.street;
    this.formModel.shipDate = this.datePipe.transform(today, 'yyyy-MM-dd');
    this.formModel.credit = "";


  }

  ngOnInit() {
    // this.orderForm.form.controls.shipDate.setValue(new Date());
    // this.shipDateRef.nativeElement.value = new Date();
  }

}
