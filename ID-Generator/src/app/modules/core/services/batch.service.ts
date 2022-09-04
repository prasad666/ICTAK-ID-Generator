import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class BatchService {
  API = environment.apiBase + '/batches/';

  constructor(private http: HttpClient) {}

  getById(id: any) {
    return this.http.get(this.API + id);
  }
  getBatches(page = 1, limit = 10, filter = '', sortColumn = '', sortDir = '') {
    return this.http.get(this.API, {
      params: new HttpParams()
        .set('page', page)
        .set('size', limit)
        .set('filter', filter)
        .set('sort', sortColumn)
        .set('dir', sortDir),
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
}
