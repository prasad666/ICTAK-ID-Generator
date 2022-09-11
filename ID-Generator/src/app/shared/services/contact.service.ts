import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private API = environment.api_url + '/shared/contact';

  constructor(private http: HttpClient) {}

  PostMessage(input: any) {
    return this.http.post(this.API, input, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          } else {
            return null;
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }
}
