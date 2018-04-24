import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {Router} from '@angular/router';
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

  slideActive = 0;

  detailOpen = false;
  activeProject;

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



  constructor(private service: ProjectsService, private route: ActivatedRoute, public sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    const that = this;
    console.log('init detailopen:', this.detailOpen);

    this.route.data.subscribe(function(e) {
      that.activeProject = e;
      console.log('route', e.project);

      if (e.project) {
        that.detailOpen = true;
        console.log('set true', that.detailOpen);
      } else {
        that.detailOpen = false;
        console.log('set false', that.detailOpen);
      }
    });

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
   // console.log('ngAfterViewInit');
  }

  next() {
    this.owlElement.next([500]);
  }
  prev() {
    this.owlElement.previous([500]);
  }

  onChange(e) {
   //  console.log(e.item.index);
  }

  joooooo() {
    // get translate
    const el = document.getElementsByClassName('owl-stage')[0];
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(el).webkitTransform);
   // console.log(window.getComputedStyle(el).transform);
    // console.log('translateX: ', matrix.m41);
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

  openProject(project) {
   // this.detailOpen = true;
    this.router.navigate([project]);
    // setTimeout(() => {

    // }, 2000);
    // this.activeProject = '';
  }

  nextSlide() {
    if (this.slideActive !== 5) {
      this.slideActive += 1;
    } else {
      this.slideActive = 0;
    }
  }

  prevSlide() {
    if (this.slideActive !== 0) {
      this.slideActive -= 1;
    } else {
      this.slideActive = 5;
    }
  }

}
