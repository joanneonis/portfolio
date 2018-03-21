import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first, flatMap } from 'rxjs/operators';
@Injectable()
export class ProjectsService implements Resolve<any> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const title: string = route.params['title'];
    return this.getProjects().pipe(
      flatMap(a => a),
      first(a => a.title.toLowerCase() === title.toLowerCase())
    );
  }
  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>('/assets/data/projects.json');
  }

}
