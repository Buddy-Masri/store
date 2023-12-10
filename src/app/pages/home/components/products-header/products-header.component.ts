import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header-component.html",
  styles: [],
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() itemsDisplayCount = new EventEmitter<number>();


  
  sort = "Des";
  itemsCount = 10;

  onSortUpdate(value: string) {
    this.sort = value;
    this.sortChange.emit(value)
  }

  onItemsUpdate(count: number) {
    this.itemsCount = count;
    this.itemsDisplayCount.emit(count)
  }

  onColumnsUpdate(colsNum: number) {
    this.columnsCountChange.emit(colsNum)
  }
}
