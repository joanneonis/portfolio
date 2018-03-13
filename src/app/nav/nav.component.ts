import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor() { }

  ngOnInit() {

  }

  open() {
    const svg = document.getElementById('bg');
    const s = Snap(svg);

    const step0 = Snap.select('#step0');
    const step1 = Snap.select('#step1');
    const step2 = Snap.select('#step2');
    const step3 = Snap.select('#step3');

    const step0points = step0.node.getAttribute('d');
    const step1points = step1.node.getAttribute('d');
    const step2points = step2.node.getAttribute('d');
    const step3points = step3.node.getAttribute('d');

    const toStep1 = function() {
      step0.animate({ d: step1points }, 500, mina.linear, toStep2);
    };

    const toStep2 = function() {
      step0.animate({ d: step2points }, 500, mina.linear, toStep3);
    };

    const toStep3 = function() {
      step0.animate({ d: step3points }, 420, mina.linear, back);
    };

    const back = function() {
      step0.animate({ d: step0points }, 420, mina.linear);
    };

    toStep1();
    this.navOpen = true;
  }

}
