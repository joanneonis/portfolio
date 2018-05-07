import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() openProject;
  @Output() paginated = new EventEmitter();
 // project: any;
  carouselOptions: any = {
    items: 2,
    dots: false,
    navigation: false,
    autoplay: true,
    autoplayTimeout: 10000,
    loop: true,
    responsive : {
      0 : {
        items: 1,
        margin: 0,
      },
      700 : {
        margin: 20,
        items: 2
      }
  }
  };

  projectYoutube;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {
   // this.project = this.route.snapshot.data['project'];
    // this.route.data.subscribe(a => this.project = a['project']);

    // this.route.data.subscribe(function(e) {
    //   console.log(e);
    // });
    const url = this.openProject.project.contentblocks.filter(a => a.type === 'youtube')[0].content;
    this.projectYoutube = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  paginate(e) {
    this.paginated.emit(e);
  }

  safeURL(e) {
   // console.log('object');
    return this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }
}
