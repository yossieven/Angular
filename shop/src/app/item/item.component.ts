import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CartItem } from '../cart-item';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  @Input() item: CartItem;
  detailedItem: DetailsItem;

  constructor(private cartItemService: CartItemService) { }

  ngOnInit() {

  }


}
