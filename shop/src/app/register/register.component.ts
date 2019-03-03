import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  @ViewChild('id') idInputRef: ElementRef;
  @ViewChild('email') emailInputRef: ElementRef;
  @ViewChild('confirmPassword') confirmInputRef: ElementRef;
  @ViewChild('password') passwordInputRef: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  nextStep(value: any) {
    console.log(value);
    console.log(this.idInputRef);
    console.log(this.emailInputRef);
    console.log(this.confirmInputRef);
    console.log(this.passwordInputRef);
  }

}
