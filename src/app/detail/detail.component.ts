import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() openProject;
 // project: any;
  carouselOptions: any = {
    items: 2,
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


  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
   // this.project = this.route.snapshot.data['project'];
    // this.route.data.subscribe(a => this.project = a['project']);

    // this.route.data.subscribe(function(e) {
    //   console.log(e);
    // });
  }

  safeURL(e) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }
}
