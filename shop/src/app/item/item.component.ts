import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  @Input() item: DetailsItem;
  @Input() cartId: number;
  detailedItem: DetailsItem;

  constructor(private cartItemService: CartItemService) { }

  ngOnInit() {
    console.log("ItemComponent: ngOnInit - detailed item is", this.item);

  }
  removeItem(id, cartId) {
    console.log(`deleting item ${id} for cart ${cartId}`);
    this.cartItemService.deleteCartItem(id, cartId);
  }


}
