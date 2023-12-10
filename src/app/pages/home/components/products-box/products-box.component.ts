import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AddToCartService } from "src/app/services/cart.services";
import { Item } from "src/app/models/cart";

@Component({
  selector: "app-products-box",
  templateUrl: "./products-box.component.html",
})
export class ProductsBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() data: any;
  @Input() filteredData: any;

  constructor(private addCart: AddToCartService) {}

  ngOnInit(): void {}

  addToCart(item: Item) {
    this.addCart.addToCart(item);
  }
}
