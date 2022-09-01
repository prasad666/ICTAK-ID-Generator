import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  root = 'http://localhost:3000/'
  currentUser:any = this.getCurrentUser();
  token:any = this.getToken();

  constructor(private http: HttpClient) { }

  register(formData:any){
    return this.http.post(`${this.root}users/signup`, formData);
  }

  login(formData:any){
    return this.http.post(`${this.root}users/signin`, formData);
  }

  setUser (token:string, user:any) {
    this.currentUser = user;
    this.token = token;
  }
  
  storeUser (token:string, user:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
  }

  getCurrentUser(){
    if(!this.currentUser){
      let user= localStorage.getItem('currentUser');
      if(user) return JSON.parse(user);
      return undefined;     
    }
    return this.currentUser
  }

  getToken(){
    if(!this.token) return localStorage.getItem('token');
    return this.token;
  }

  isLoggedIn(){
    if(!this.token) this.token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.token);
  }
    
  logout(){
    this.currentUser = undefined;
    this.token = undefined;
    localStorage.clear();
  }

  forgotPassword(email:any){
    return this.http.post(`${this.root}users/forgotPassword`, email);
  }

  resetPassword(password:any,token:string){
    return this.http.patch(`${this.root}users/resetPassword/${token}`, password);
  }

}
