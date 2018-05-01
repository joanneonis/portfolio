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
  slideIndex;
  slided;

  detailOpen = false;
  activeProject;

  carouselOptions;

  projects: any[];



  constructor(
    private service: ProjectsService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    const that = this;
    this.updateCarousel(0);

    // this.service.getProjects().subscribe(a => this.projects = a);
    this.service.getProjects().subscribe(function(a) {
      that.projects = a;
      that.slideActive = a.findIndex(x => x.title === (that.activeProject.project.title));
      console.log(this.slideActive);
      that.updateCarousel(that.slideActive);
    });

    this.route.data.subscribe(function(e) {
      that.activeProject = e;
      // console.log('route', e.project);
      // console.log(that.slideActive);

      // console.log('routed', that.projects);

      // if () {
      //   that.slideActive = that.projects.findIndex(x => x.title === (that.activeProject.project.title));
      // }
      if (e.project) {
        that.detailOpen = true;
      //  console.log('set true', that.detailOpen);
      } else {
        that.detailOpen = false;
      //  console.log('set false', that.detailOpen);
      }
    });

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
          console.log('style changed!');
      });
    });

      // const target = this.el.nativeElement;

     // const target: Element = document.getElementById('owl-stage');
    // observer.observe(target, { attributes : true, attributeFilter : ['style'] });

    $('.tilt-effect').tilt({
      glare: false,
      maxTilt: 5,
      maxGlare: 0.05,
      speed: 1000,
      perspective: 1500
    });
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
    let slide = e.item.index - e.relatedTarget._clones.length / 2 % e.item.count;
   this.slideActive = e.item.index;
   this.routet(this.slideActive);

     if (this.detailOpen && !isNaN(slide) && this.projects) {
      // weird bug
      if (slide === 6) {
        slide = 0;
      }
      this.router.navigate([this.projects[slide].title]);
    }
  }

  routet(i) {

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

    // tslint:disable-next-line:no-shadowed-variable
      // console.log(that.activeProject.project.title, that.projects);
     // const that = this;
//      const pos = that.projects.map(function(e) { return e.title; }).indexOf(that.activeProject.project.title);
      // const index = that.projects.findIndex(that.activeProject.project); // x.title === that.activeProject.project.title
      // console.log('index is:', pos);

  }

  nextSlide() {
    if (this.slideActive !== this.projects.length - 1) {
      this.slideActive += 1;
    } else {
      this.slideActive = 0;
    }

    this.slided = true;
  }

  prevSlide() {
    if (this.slideActive !== 0) {
      this.slideActive -= 1;
    } else {
      this.slideActive = this.projects.length - 1;
    }
  }

  paginated(e) {
    const that = this;
    this.router.navigate(['/' + e]);
    this.slideActive = this.projects.findIndex(x => x.title === (e));
    console.log('paginated info', e, this.slideActive);


    this.owlElement.trigger('to.owl.carousel', [this.slideActive]);
  }

  updateCarousel(i) {
    this.carouselOptions = {
      items: 1,
      dots: false,
      navigation: false,
      autoplay: false,
      autoplayTimeout: 10000,
      loop: true,
      onChanged: this.onChange.bind(this),
      onInitialized: this.tilt.bind(this),
      startPosition: i
    };
  }
}
