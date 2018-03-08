import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
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
      title: 'Uncover',
      img: './assets/img/work/mockup-uncover.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Avans University of Applied Sciences',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Noordbrabants museum',
    },
    {
      title: 'Uncover',
      img: './assets/img/work/mockup-uncover.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Avans University of Applied Sciences',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Noordbrabants museum',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
