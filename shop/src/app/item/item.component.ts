import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from '../cart-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: CartItem;
  constructor() { }

  ngOnInit() {
  }

}
