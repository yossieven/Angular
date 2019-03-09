import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-quantity-modal',
  templateUrl: './quantity-modal.component.html',
  styleUrls: ['./quantity-modal.component.css']
})
export class QuantityModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() setQuantity: EventEmitter<number> = new EventEmitter();
  @ViewChild('quantity') quantity: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  cancelAction() {
    console.log("QuantityModalComponent: cancelAction - closing modal")
    this.closeModal.emit(true);
  }

  addToCart() {
    console.log("QuantityModalComponent: addToCart - quantity", this.quantity.nativeElement.value);
    this.setQuantity.emit(this.quantity.nativeElement.value);
    this.closeModal.emit(true);
  }

}
