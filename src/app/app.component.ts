import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  navOpen = false;
  navClosed = false;

  handleNavOpen(e: boolean) {
    this.navOpen = e;
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      // window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      // this.container.nativeElement.scrollTo(0, 0);
    });
  }
}
