import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cities } from '../cities';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  disableFirstSet: boolean = false;
  disableSecondSet: boolean = true;
  listOfCities = new Cities();
  registeredUser: User = null;
  createdUser: User = null;

  @ViewChild('id', { read: ElementRef }) idInputRef: ElementRef;
  @ViewChild('email') emailInputRef: ElementRef;
  @ViewChild('confirmPassword') confirmInputRef: ElementRef;
  @ViewChild('password') passwordInputRef: ElementRef;

  constructor(private userService: UserService, private router: Router, private utilityService: UtilitiesService) {
    this.userService.user$.subscribe(
      data => {
        this.createdUser = data[0];
        console.log("register: returned from service", data);
        if (this.createdUser != null) {
          //this.userService.checkLogin(this.createdUser.email, this.createdUser.password);
          localStorage.setItem('loggedUser', this.createdUser.id);
          router.navigate(['home']);
        }
      },
      error => { console.error(`register: Error in retrieving user : `, error); }
    );
  }

  ngOnInit() {
  }

  nextStep(value: any) {
    console.log(this.idInputRef.nativeElement);
    if (value.valid) {
      this.disableFirstSet = true;
      this.disableSecondSet = false;
    }

  }

  stepBack() {
    this.disableFirstSet = false;
    this.disableSecondSet = true;
    console.log(this.idInputRef);
    this.idInputRef.nativeElement.focus();
  }

  async registerUser(form1: any, form2: any) {
    console.log(form1.value.registerID);
    console.log(form2.value);
    if (form2.valid) {
      this.registeredUser = new User();
      this.registeredUser.id = form1.value.registerID;
      this.registeredUser.email = form1.value.registerMail;
      this.registeredUser.password = form1.value.registerPass;
      this.registeredUser.city = form2.value.registerCity;
      this.registeredUser.street = form2.value.registerStreet;
      this.registeredUser.name = form2.value.registerName;
      this.registeredUser.last_name = form2.value.registerLastName;
      await this.userService.createUser(this.registeredUser);



    }

  }

}
