import { Component } from "@angular/core";
import { AddToCartService } from "src/app/services/cart.services";
import { Cart } from "src/app/models/cart";

@Component({
  selector: "app-header",
  templateUrl: "./header-component.html",
  styles: [],
})
export class HeaderComponent {
  cart: Cart = {items:[]} ;

  constructor(private cartSrvc: AddToCartService) {
    this.cartSrvc.cart.subscribe((data) => {
      this.cart = data;
    });
  }


  getSubTotall() {
    return this.cartSrvc.getGrandTotal()
   }
}
