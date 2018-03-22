import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

import { OwlModule } from 'ngx-owl-carousel';
import { NavComponent } from './nav/nav.component';
import { HeadingsComponent } from './headings/headings.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';
import { ProjectsService } from './projects.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { CountToModule } from 'angular-count-to';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    HeadingsComponent,
    DetailComponent,
    AboutComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    CountToModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
