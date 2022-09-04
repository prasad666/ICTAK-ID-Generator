import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.auth.isLoggedIn()) {   
        const urlArray = state.url.split('/')
        const role = this.auth.currentUser.role
        if(urlArray[1]==='secure'&& urlArray[2]==='student' && role==='student'){
          return true
        }
        if(urlArray[1]==='backend'){
          if(
            urlArray[2]==='batchmanager' && role==='batchManager'){
            return true
          }
          if(
            urlArray[2]==='admin' && role==='admin'){
            return true
          }
        }
      };
      this.router.navigate(['pages/home'])
      return false;  

  }
  
}
