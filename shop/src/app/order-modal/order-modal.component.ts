import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() cartItems: DetailsItem[];
  data: string = "";

  constructor(private router: Router, private itemsService: CartItemService) {

  }

  ngOnInit() {
  }

  cancelAction() {
    console.log("QuantityModalComponent: cancelAction - closing modal")
    this.closeModal.emit(true);
  }

  confirm() {
    this.cancelAction();
    this.router.navigate(['home']);
  }
  createDataForFile() {
    let totalCartPrice = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    totalCartPrice = Math.round(totalCartPrice * 100) / 100;
    this.data = "<!DOCTYPE html><html><head><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;direction: rtl;}";
    this.data += "td, th {border: 1px solid #dddddd; text-align: right; padding: 8px;}";
    this.data += "tr:nth-child(even) {background-color: #dddddd;}</style></head><body>";
    this.data += "<h2>סיכום הזמנה</h2><table><tr><th>שם מוצר</th><th>כמות</th><th>מחיר סופי</th></tr>";

    this.cartItems.forEach(item => {
      this.data += "<tr><td>" + item.name + "</td><td>" + item.amount + "</td><td>" + item.total + "</td></tr>";
    });

    this.data += "</table><br><br><h1 style=\"text-align: right\">סה\"כ הזמנה - " + totalCartPrice + "</h1>";
    this.data += "</body></html>";
  }

  downloadReceipt() {
    this.createDataForFile();
    let blob = new Blob([this.data], { type: 'text/html' });

    var downloadURL = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = "help.html";
    link.click();
  }
}
