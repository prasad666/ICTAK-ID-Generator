import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  API = environment.api_url +'/applications';

  constructor(private http:HttpClient) { }

  getPendingApplications(batchesString:string){
    return this.http.get(`${this.API}/pending`,{
      params: new HttpParams().set('batches', batchesString)
    })
  }

  getApplication(id:string){
    return this.http.get(`${this.API}/${id}`)
  }

  approveApplication(id:string, remarks:string){
    return this.http.put(`${this.API}/${id}`, {status:'approved',remarks:remarks})
  }

  rejectApplication(id:string,remarks:string){
    return this.http.put(`${this.API}/${id}`, {status:'rejected',remarks:remarks})
  }

  getHistory(batches:string,fromDate:any, toDate:any){
    return this.http.get(`${this.API}/history`, {
      params: new HttpParams()
        .set('batches', batches)
        .set('from', fromDate)
        .set('to', toDate),
    });
  }
  applicationStatus(){
    return this.http.get(`${this.API}/status`)
  }

  getPdf(id:any){
    return this.http.get(`${this.API}/getPdf/${id}`,{responseType:'blob'})
  }

}
