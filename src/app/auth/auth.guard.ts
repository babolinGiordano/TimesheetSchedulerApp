import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private authService: AuthService,
      private router: Router
   ) { }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isLoggedIn
         .take(1)
         .map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
               this.router.navigate(['/login']);
               return false;
            }
            return true;
         });
   }
}

