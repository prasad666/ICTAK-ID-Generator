import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'any'
})

export class RegistrationService {

  newStudent(item: any) {
    return this.http
      .post(environment.api_url + '/insert', { student: item })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
