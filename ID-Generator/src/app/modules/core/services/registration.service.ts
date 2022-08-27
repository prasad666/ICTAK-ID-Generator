import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'
@Injectable({
  providedIn: 'any'
})

export class RegistrationService {

  constructor(private http:HttpClient) { }

  newStudent(item:any)
  {   
    return this.http.post("http://localhost:3000/insert",{"student":item})
    .subscribe(data =>{console.log(data)})
  }
}