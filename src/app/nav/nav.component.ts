import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
// import * as Snap from 'snapsvg';
// import Snap, { mina } from 'snapsvg-cjs';
import { ProjectsService } from '../projects.service';


declare var Snap: any;
declare var mina: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  @Output() navOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('bg') bg: ElementRef;
  s = Snap(document.getElementById('bg'));
  isNavOpen = false;
  projects: any[];

  constructor(private router: Router, private service: ProjectsService) { }

  ngOnInit() {
    this.service.getProjects().subscribe(a => this.projects = a);
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

    if (!this.isNavOpen) {
      const toStep1 = function() {
        step0.animate({ d: step1points }, 450, mina.linear, toStep2);
      };

      const toStep2 = function() {
        step0.animate({ d: step2points }, 450, mina.linear, toStep3);
      };

      const toStep3 = function() {
        step0.animate({ d: step3points }, 370, mina.linear);
      };
      toStep1();
      this.navOpen.emit(true);
    } else {
      const toStep1 = function() {
        step0.animate({ d: step2points }, 250, mina.linear, back);
      };
      const back = function() {
        step0.animate({ d: step9points }, 270, mina.linear);
      };
      toStep1();
      this.navOpen.emit(false);
    }

     this.isNavOpen = !this.isNavOpen;
  }

  goto(e) {
    this.router.navigate([e]);

    setTimeout(() => {
      this.open();
    }, 100);
  }
}
