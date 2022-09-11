import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'any',
})
export class UserService {
  API = environment.api_url + '/users/';

  constructor(private http: HttpClient) {}

  getById(id: any) {
    return this.http.get(this.API + id);
  }
  getUsers(
    role = '',
    page = 1,
    limit = 10,
    filter = '',
    sortColumn = '',
    sortDir = ''
  ) {
    return this.http.get(this.API, {
      params: new HttpParams()
        .set('role', role)
        .set('page', page)
        .set('size', limit)
        .set('filter', filter)
        .set('sort', sortColumn)
        .set('dir', sortDir),
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API + 'all', {});
  }

  getUsersByRole(role: any) {
    return this.http.get(this.API + 'all', {
      params: new HttpParams().set('role', role),
    });
  }
  create(data: any): any {
    return this.http.post(this.API, data);
  }
  update(id: any, data: any): any {
    return this.http.put(this.API + id, data);
  }
  delete(id: any) {
    return this.http.delete(this.API + id);
  }

  activate(id: any) {
    return this.http.patch(this.API + id, {});
  }
}
