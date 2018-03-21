import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'tilt.js';
import * as $ from 'jquery';
@Component({
  selector: 'app-headings',
  templateUrl: './headings.component.html',
  styleUrls: ['./headings.component.css']
})
export class HeadingsComponent implements OnInit {
  @ViewChild('test') test: ElementRef;

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

    $('.tilt-effect').tilt({
      glare: false,
      maxTilt: 5,
      maxGlare: 0.05,
      speed: 1000,
      perspective: 1500
    });
  }

}
