import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  carouselOptions: any = {
    items: 3,
    dots: false,
    navigation: false,
    autoplay: false,
    autoplayTimeout: 10000,
    loop: false,
    margin: 20
  };

  images = [
    {
      title: 'Home',
      img: './assets/img/work/uncover-screens/home.png',
    },
    {
      title: 'Info',
      img: './assets/img/work/uncover-screens/info.png',
    },
    {
      title: 'recording',
      img: './assets/img/work/uncover-screens/record.png',
    },
    {
      title: 'foto',
      img: './assets/img/work/uncover-screens/foto.png',
    },
    {
      title: 'teken',
      img: './assets/img/work/uncover-screens/draw.png',
    }
  ];

  image = [
    {
      title: 'Willeke',
      img: './assets/img/work/mockup-marie.png',
      bg: './assets/img/work/bg-uncover-2.png',
      company: 'Avans University of Applied Sciences',
      role: 'Concept, Design, Frontend, Teamleader',
      client: 'Marie Willeke',
      type: 'web',
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
