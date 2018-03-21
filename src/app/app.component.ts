import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  navOpen = false;
  navClosed = false;

  handleNavOpen(e: boolean) {
    this.navOpen = e;
  }
}
