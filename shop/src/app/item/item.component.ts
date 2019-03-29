import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CartItemService } from '../cart-item.service';
import { DetailsItem } from '../details-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges {



  @Input() item: DetailsItem;
  @Input() cartId: number;
  @Input() viewOnly: boolean;
  detailedItem: DetailsItem;

  constructor(private cartItemService: CartItemService) { }

  ngOnInit() {
    console.log("ItemComponent: ngOnInit - detailed item is", this.item);

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("ItemComponent: ngOnChanges - viewOnly", this.viewOnly);
  }

  removeItem(id, cartId) {
    console.log(`deleting item ${id} for cart ${cartId}`);
    this.cartItemService.deleteCartItem(id, cartId).subscribe((res) => { this.cartItemService.getItems(this.cartId.toString()); });;
  }


}
