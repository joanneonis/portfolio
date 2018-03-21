import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import * as Snap from 'snapsvg';
// import Snap, { mina } from 'snapsvg-cjs';

declare var Snap: any;
declare var mina: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  @ViewChild('bg') bg: ElementRef;
  navOpen = false;
  s = Snap(document.getElementById('bg'));

  constructor(private router: Router) { }

  ngOnInit() {

  }

  open() {
    const mask = Snap.select('#mask');
    const step0 = Snap.select('#step0');
    const step1 = Snap.select('#step1');
    const step2 = Snap.select('#step2');
    const step3 = Snap.select('#step3');
    const step9 = Snap.select('#step9');

    const step0points = step0.node.getAttribute('d');
    const step1points = step1.node.getAttribute('d');
    const step2points = step2.node.getAttribute('d');
    const step3points = step3.node.getAttribute('d');
    const step9points = step9.node.getAttribute('d');

    if (!this.navOpen) {
      const toStep1 = function() {
        step0.animate({ d: step1points }, 350, mina.linear, toStep2);
      };

      const toStep2 = function() {
        step0.animate({ d: step2points }, 350, mina.linear, toStep3);
      };

      const toStep3 = function() {
        step0.animate({ d: step3points }, 270, mina.linear);
      };
      toStep1();

    } else {
      const toStep1 = function() {
        step0.animate({ d: step2points }, 150, mina.linear, back);
      };
      const back = function() {
        step0.animate({ d: step9points }, 170, mina.linear);
      };
      toStep1();
    }

    this.navOpen = !this.navOpen;
  }

  goto() {
    console.log('object');
    this.router.navigate(['detail']);

    setTimeout(() => {
      this.open();
    }, 100);
  }
}
