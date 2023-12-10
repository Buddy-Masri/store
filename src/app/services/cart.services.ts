import { Injectable } from "@angular/core";
import { Cart, Item } from "../models/cart";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class AddToCartService {
  cartItems: Array<Item> = [];

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private snackbar: MatSnackBar) {
    this.loadCartFromLocalStorage();
  }

  addToCart(item: Item) {
    const items = [...this.cart.value.items];
    const existingItem = items.find((obj) => obj.title === item.title);
    if (!existingItem) {
      items.push(item);
    } else {
      existingItem.quantity += 1;
    }
    this.cart.next({ items });
    this.saveCartToLocalStorage();
    this.snackbar.open("Cart Updated", "ok", { duration: 3000 });
  }

  removeFromCart(item: Item) {
    const items = [...this.cart.value.items];
    const itemIndex = items.indexOf(item);
    items.splice(itemIndex, 1);
    this.cart.next({ items });
    this.saveCartToLocalStorage();
    this.snackbar.open("Cart Updated", "ok", { duration: 3000 });
  }

  clearCart() {
    const items: Array<Item> = [];
    this.cart.next({ items });
    this.saveCartToLocalStorage();
    this.snackbar.open("Cart Cleared", "ok", { duration: 3000 });
  }

  getGrandTotal() {
    const items = [...this.cart.value.items];
    return items
      .map((data) => data.price * data.quantity)
      .reduce((acc, curr) => acc + curr, 0);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart.value));
  }

  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart.next(JSON.parse(savedCart));
    }
  }

  qtyMinus(element: Item) {
    const items = [...this.cart.value.items];
    if (element.quantity > 0) {
      element.quantity -= 1;
      if (element.quantity === 0) {
        const x = items.indexOf(element);
        items.splice(x, 1);
      }
    }
    this.cart.next({ items });
    this.saveCartToLocalStorage();
  }

  qtyPLus(element: Item) {
    const items = [...this.cart.value.items];
    const item = items.find((obj) => obj.title === element.title);
    if (item) {
      item.quantity += 1;
    }
    this.cart.next({ items });
    this.saveCartToLocalStorage();
  }
}
