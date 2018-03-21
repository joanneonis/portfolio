import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import 'tilt.js';
import * as $ from 'jquery';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild('.owl-stage') el: ElementRef;

  carouselOptions: any = {
    items: 1,
    dots: false,
    navigation: false,
    autoplay: false,
    autoplayTimeout: 10000,
    loop: true,
    onTranslated: this.onChange.bind(this),
    onInitialized: this.tilt.bind(this)
  };

  projects: any[];



  constructor(private service: ProjectsService) { }

  ngOnInit() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
          console.log('style changed!');
      });
    });

    this.service.getProjects().subscribe(a => this.projects = a);
      // const target = this.el.nativeElement;

     // const target: Element = document.getElementById('owl-stage');
    // observer.observe(target, { attributes : true, attributeFilter : ['style'] });

    // $('.tilt-effect').tilt({
    //   glare: false,
    //   maxTilt: 5,
    //   maxGlare: 0.05,
    //   speed: 1000,
    //   perspective: 1500
    // });
  }

  ngAfterViewInit() {
    // console.log(this.el);
  }

  next() {
    this.owlElement.next([500]);
  }
  prev() {
    this.owlElement.previous([500]);
  }

  onChange(e) {
    console.log(e.item.index);
  }

  joooooo() {
    // get translate
    const el = document.getElementsByClassName('owl-stage')[0];
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(el).webkitTransform);
   // console.log(window.getComputedStyle(el).transform);
    console.log('translateX: ', matrix.m41);
  }

  tilt() {
    $('.tilt-effect').each(function(i, obj) {
      $(this).tilt({
        glare: false,
        maxTilt: 5,
        maxGlare: 0.05,
        speed: 1000,
        perspective: 1500
      });
    });
  }

}
