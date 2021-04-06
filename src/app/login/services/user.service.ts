import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urls} from '../../shared/consts';
import {Observable} from 'rxjs';

export interface User {
  login: string;
  token: string;
  role: string;
  refreshToken: string;
  enabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private authorize = false;
  private user: User = null;

  constructor(private http: HttpClient) {
  }

  setAuthorized(user: User): void {
    user ? this.user = user : this.user = null;
    this.authorize = !!user;
  }

  get isAuthorized(): boolean {
    return this.authorize;
  }

  logIn({login, password}): Observable<User> {
    return this.http.post<User>(urls.login, {login, password});
  }
}
