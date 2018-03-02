import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  images = [
    {
      title: 'test',
      img: 'test'
    },
    {
      title: 'test2',
      img: 'test'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
