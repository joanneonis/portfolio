import { Component, OnInit } from '@angular/core';
import { CountToModule } from 'angular-count-to';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  hide;

  count = {
    countTo: 100,
    from: 0,
    duration: 1.5
  };

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
