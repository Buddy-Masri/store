import { Component, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent {
  @Output() categorySelect = new EventEmitter<string>();
  @Input() cats: any;

  onShowCategory(cat: string): void {
    this.categorySelect.emit(cat);
  }
}
