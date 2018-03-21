import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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
  };

  images = [
    {
      title: 'Uncover',
      img: './assets/img/work/mockup-uncover.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Avans University of Applied Sciences',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Noordbrabants museum',
    },
    {
      title: 'Willeke',
      img: './assets/img/work/mockup-marie.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Avans University of Applied Sciences',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Marie Willeke',
    },
    {
      title: 'Heilersig',
      img: './assets/img/work/mockup-heilersig.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Freelance',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Studie',
    },
    {
      title: 'Groen',
      img: './assets/img/work/mockup-jij.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Boerdam',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Provincie Overijssel',
    }
  ];



  constructor() { }

  ngOnInit() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
          console.log('style changed!');
      });
    });

      // const target = this.el.nativeElement;

     // const target: Element = document.getElementById('owl-stage');
    // observer.observe(target, { attributes : true, attributeFilter : ['style'] });
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

}
