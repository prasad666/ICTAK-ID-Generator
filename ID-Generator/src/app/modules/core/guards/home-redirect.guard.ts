import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRedirectGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(this.auth.isLoggedIn()) {   
      const role = this.auth.currentUser.role
      if(role==='student'){
        this.router.navigate(['secure/student'])
        return false
      }
      if(role==='batchManager'){
        this.router.navigate(['backend/batchmanager'])
        return false
      }
      if(role==='admin'){
        this.router.navigate(['backend/admin'])
        return false
      }
    };
    return true;
  }
  
}
