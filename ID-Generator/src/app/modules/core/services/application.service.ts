import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  API = environment.api_url +'/applications';

  constructor(private http:HttpClient) { }

  getPendingApplications(batchId:string){
    return this.http.get(`${this.API}/pending/${batchId}`)
  }

  getApplication(id:string){
    return this.http.get(`${this.API}/${id}`)
  }

  approveApplication(id:string){
    return this.http.put(`${this.API}/${id}`, {status:'approved'})
  }

  rejectApplication(id:string,remarks:string){
    return this.http.put(`${this.API}/${id}`, {status:'rejected',remarks:remarks})
  }


}
