import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  root = 'http://localhost:3000/'
  currentUser:any= this.getCurrentUser;
  token:any;

  constructor(private http: HttpClient) { }

  register(formData:any){
    return this.http.post(`${this.root}users/signup`, formData);
  }

  login(formData:any){
    return this.http.post(`${this.root}users/signin`, formData);
  }

  storeUserData (token:string, user:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
    this.token = token;
  }

  getCurrentUser(){
    if(!this.currentUser){
      let user= localStorage.getItem('currentUser');
      user ? this.currentUser= JSON.parse(user) : null;
    }
    return this.currentUser
  }
  
  logout(){
    this.currentUser = undefined;
    this.token = undefined;
    localStorage.clear();
  }

}
