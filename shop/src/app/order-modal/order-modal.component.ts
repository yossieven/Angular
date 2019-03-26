import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router) { }

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
}
