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
  @ViewChild('bgL') bgL: ElementRef;

  s = Snap(document.getElementById('bg'));
  s2 = Snap(document.getElementById('bgL'));
  isNavOpen = false;
  projects: any[];
  windowTest;
  svgSize = '.bg';

  isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  isEdge = navigator.appVersion.indexOf('Edge') > -1;


  constructor(private router: Router, private service: ProjectsService) { }

  ngOnInit() {
    this.service.getProjects().subscribe(a => this.projects = a);

    this.windowTest = window.matchMedia('(min-width: 1440px)');
    this.triggerAnimation(this.windowTest);
    // this.windowTest.addListener(this.triggerAnimation);

    if (this.isSafari) {
      console.log('hello safari');
    }

    // To do (safari and firefox masking)
  }

  open() {
    const mask = Snap.select(this.svgSize + ' #mask');
    const step0 = Snap.select(this.svgSize + ' #step0');
    const step1 = Snap.select(this.svgSize + ' #step1');
    const step2 = Snap.select(this.svgSize + ' #step2');
    const step3 = Snap.select(this.svgSize + ' #step3');
    const step9 = Snap.select(this.svgSize + ' #step9');

    const step0points = step0.node.getAttribute('d');
    const step1points = step1.node.getAttribute('d');
    const step2points = step2.node.getAttribute('d');
    const step3points = step3.node.getAttribute('d');
    const step9points = step9.node.getAttribute('d');

    if (this.isChrome) {
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
    } else{
      if (!this.isNavOpen) {
        this.navOpen.emit(true);
      } else{
this.navOpen.emit(false);
      }
    }


     this.isNavOpen = !this.isNavOpen;
  }

  goto(e) {
    this.router.navigate([e]);

    setTimeout(() => {
      this.open();
    }, 100);
  }

  triggerAnimation(x) {
    if (x.matches) {
      this.svgSize = '.bg-lg';
    } else {
      this.svgSize = '.bg';
    }
  }
}




