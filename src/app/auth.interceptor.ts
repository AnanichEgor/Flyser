import {
  HttpEvent,
  HttpEventType,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UserService} from './login/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {
  }

  private getAuthParam(): string {
    return `Bearer $(this.userService.getToken())`;

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercept request', req);
    let cloned;
    if (this.userService.isAuthorized) {
      cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getToken()}`
        }
      });
    } else {
      cloned = req;
    }


    return next.handle(cloned).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('Interceptor response', event);
        }
      })
    );
  }
}
