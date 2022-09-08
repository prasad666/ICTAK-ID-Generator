import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  API = environment.api_url;

  constructor(private http:HttpClient) { }

  getPendingApplications(batchId:string){
    return this.http.get(`${this.API}/applications/pending/${batchId}`)
  }
}
