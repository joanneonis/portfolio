import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeadingsComponent } from './headings/headings.component';
import { DetailComponent } from './detail/detail.component';
import { AboutComponent } from './about/about.component';
import { ProjectsService } from './projects.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'headings',
    component: HeadingsComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'projects/:title',
    component: DetailComponent,
    resolve: {
      project: ProjectsService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

