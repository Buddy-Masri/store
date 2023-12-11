import { Component, OnDestroy, OnInit } from "@angular/core";
import { Cart } from "src/app/models/cart";
import { AddToCartService } from "src/app/services/cart.services";
import { Item } from "src/app/models/cart";
import { HttpClient } from "@angular/common/http";
import { async } from "rxjs";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  constructor(private cartSrvc: AddToCartService, private http: HttpClient) {}

  dataSource: Array<Item> = [];

  displayColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.cartSrvc.cart.subscribe((data) => {
      this.dataSource = data.items;
    });
  }

  qtyPlus(element: any) {
    this.cartSrvc.qtyPLus(element);
  }

  qtyMinus(element: any) {
    this.cartSrvc.qtyMinus(element);
  }

  getSubTotall() {
    return this.cartSrvc.getGrandTotal();
  }

  removeItem(data: any) {
    this.cartSrvc.removeFromCart(data);
  }

  clearAll() {
    this.cartSrvc.clearCart();
  }

  onCheckout() {
    // this.http.post("http://localhost:4242/checkout", {
    //   items: this.dataSource,
    // }).subscribe(async(res:any)=>{
    //   let stripe = await loadStripe()

    // })
  }
}
