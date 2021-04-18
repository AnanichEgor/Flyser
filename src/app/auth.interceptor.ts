import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, flatMap, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UserService} from './login/services/user.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let cloned;
    const user = this.userService.gerUser();

    if (this.userService.isAuthorized && !req.url.includes('update-token')) {
      cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getToken()}`
        }
      });
    } else {
      cloned = req;
    }

    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.error);
        if (error.status === 401) {
          if (error.error.error === 'TOKEN_HAS_EXPIRED') {
            this.userService.refreshToken()
              .subscribe(() => {
                location.reload();
              });
          } else {
            this.router.navigate(['/login']).then(_ => console.log('redirect to login page...'));
          }
        }
        return throwError(error);
      })
    );
  }
}
