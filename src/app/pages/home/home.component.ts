import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Item } from "src/app/models/cart";
import { StoreService } from "src/app/services/store.service";

const rowsHeight: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight: number = rowsHeight[this.cols];
  items: Array<Item> | undefined
  sort = "desc";
  count = 10;
  productsSubscribtion: Subscription | undefined;
  categories: Array<string> | undefined;
  filterdItems: Array<Item> | undefined;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.getAllProducts(this.count, this.sort).subscribe((data) => {
      this.items = data.map((v) => ({ ...v, quantity: 1 }));
      this.categories = Array.from(new Set(data.map((v) => v.category)));
    });
  }

  onColumnsCountChange(col: number) {
    this.cols = col;
    this.rowHeight = rowsHeight[col];
  }

  onCategorySelect(catgr: string): void {
    if (catgr !== "All") {
      this.filterdItems = this.items?.filter((data) => data.category === catgr);
    } else {
      this.filterdItems = undefined;
    }
  }

  onSortChange(sort: string) {
    if (sort === "Asc") {
      this.items?.sort((a, b) => a.price - b.price);
      this.filterdItems?.sort((a, b) => a.price - b.price);
    } else {
      this.items?.sort((a, b) => b.price - a.price);
      this.filterdItems?.sort((a, b) => b.price - a.price);
    }
  }

  onitemsDisplayCount(value: number) {
    this.count = value;
    this.store.getAllProducts(this.count, this.sort).subscribe((data) => {
      this.items = data.map((v) => ({ ...v, quantity: 1 }));
      this.categories = Array.from(new Set(data.map((v) => v.category)));
    });
  }
}
