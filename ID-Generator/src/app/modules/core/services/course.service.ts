import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class CourseService {
  API_LIST = environment.apiBase + '/courses/';

  constructor(private http: HttpClient) {}

  getCourses(page = 1, limit = 10) {
    return this.http.get(this.API_LIST, {
      params: new HttpParams().set('page', page).set('size', limit),
    });
  }
}
