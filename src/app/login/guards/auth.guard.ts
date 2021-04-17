import { Injectable } from '@angular/core';
import { UserService } from './../services/user.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isAuthorized) {
      return true;
    } else
    {
      this.router.navigate(['/login'], {queryParams: {auth: false}}).then(()  => console.log('Redirect to login page...'));
    }
  }
}
