import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}
  newStudent(item: FormData) {
    return this.http.post(environment.api_url + '/users/register', item);
  }
}
