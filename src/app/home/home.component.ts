import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import 'tilt.js';
import * as $ from 'jquery';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  @ViewChild('.owl-stage') el: ElementRef;

  owlReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  slideActive = 0;
  slideIndex;
  slided;
  autoplaySpeed = 200;

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
    this.service.getProjects().subscribe((a) => {
      that.projects = a;
      that.slideActive = a.findIndex(x => x.title === (that.activeProject.project.title));
      // console.log(that.slideActive);
      that.updateCarousel(that.slideActive);
    });

    this.route.data.subscribe((e) => {
      this.activeProject = e;
      // console.log('route', e.project);
      // console.log(that.slideActive);
      // console.log(that.owlElement);
      // console.log('routed', that.projects);
      // console.log('Hai');
      this.owlReady$.subscribe(a => {
        // console.log(e.project.title, 'this is it');
        // console.log(this.owlElement);
        // console.log(this.projects);
        if (this.projects) {
          const test = this.projects.findIndex(x => x.title === (e.project.title));
          this.owlElement.trigger('to.owl.carousel', [test]);
        }

      });

      // o.subscribe(a => console.log(a));
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


      // this.router.navigate([e.project.title]);
      // this.slideActive = this.projects.findIndex(x => x.title === (e.project.title));
      // console.log('paginated info', e, this.slideActive);
      // this.owlElement.trigger('to.owl.carousel', [this.slideActive]);]
    });

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
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
    console.log('after');
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

    // console.log(`SLIDE ${slide}`);

    if (this.detailOpen && !isNaN(slide) && this.projects) {
      // weird bug
      if (slide === 6) {
        slide = 0;
      }
      const proj = this.projects[slide];
      if (proj) {
        this.router.navigate([this.projects[slide].title]);
      }
    }
  }

  routet(i) {

  }

  joooooo() {
    // get translate
    const el = document.getElementsByClassName('owl-stage')[0];
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(el).webkitTransform);

  }

  tilt() {
    $('.tilt-effect').each(function (i, obj) {
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

  slideProject(e) {
    this.slideActive = this.projects.findIndex(x => x.title === (e));
    // console.log('paginated info', e, this.slideActive);


    this.owlElement.to([this.slideActive]);
  }

  paginated(e) {
    const that = this;
    this.router.navigate(['/' + e]);
    this.slideProject(e);
  }

  updateCarousel(i) {
    this.carouselOptions = {
      items: 1,
      dots: false,
      navigation: false,
      autoplay: false,
      autoplayTimeout: this.autoplaySpeed,
      loop: true,
      onChanged: this.onChange.bind(this),
      onInitialized: this.startSlide.bind(this),
      startPosition: i
    };
  }

  startSlide(e) {
    // this.owlReady$.next(true);
    // this.owlElement.trigger('to.owl.carousel', [e]);
  }

  stopSlider() {
    this.owlElement.trigger('stop.owl.autoplay');
    // console.log('stopped the stupid slider');
  }
}
