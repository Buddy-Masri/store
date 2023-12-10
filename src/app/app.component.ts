import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  @HostListener("window:beforeunload", ["$event"])
  clearLocalStorage(event: Event): void {
    localStorage.clear();
  }

  title = "store";
}
