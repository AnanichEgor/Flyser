import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {cookieName, urls} from '../../shared/consts';
import {Observable, throwError} from 'rxjs';
import {Registration} from '../register/register.component';
import {CookieService} from 'ngx-cookie-service';
import {catchError, tap} from 'rxjs/operators';

export interface User {
  login: string;
  token: string;
  role: string;
  refreshToken: string;
  enabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface RefreshToken {
  login: string;
  token: string;
  role: string;
  refreshToken: string;
  enabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface RegRequest {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  country: string;
  city: string;
  address: string;
  birthDay: Date;
  sex: string;
  email: string;
  phoneCode: string;
  phone: string;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authorize = false;
  private user: User = null;


  constructor(private http: HttpClient, private cookieService: CookieService) {
    const cookie = this.cookieService.get(cookieName);
    if (cookie) {
      this.setAuthorized(JSON.parse(cookie));
    }
  }

  private regMapper(obj: Registration): RegRequest {
    return {
      login: obj.email,
      password: obj.password,
      firstName: obj.firstName,
      lastName: obj.lastName,
      photoUrl: '',
      country: obj.country,
      city: obj.city,
      address: obj.address,
      birthDay: obj.birthday,
      sex: obj.gender,
      email: obj.email,
      phoneCode: obj.cod,
      phone: obj.phone,
      specialty: obj.usefulInformation
    };
  }

  setAuthorized(user: User, cookie?: boolean): void {
    user ? this.user = user : this.user = null;
    this.authorize = !!user;
    if (cookie) {
      this.saveCookie();
    }
  }

  saveCookie(): void {
    if (this.user) {
      this.cookieService.set(cookieName, JSON.stringify(this.user), {expires: 7, sameSite: 'Lax'});
    }
  }

  get isAuthorized(): boolean {
    return this.authorize;
  }

  getToken(): string {
    return this.user.token;
  }

  getRefreshToken(): string {
    return this.user.refreshToken;
  }

  gerUser(): User {
    return {...this.user};
  }

  refreshToken(): Observable<any> {
    const body = {
      login: this.user.login,
      refreshToken: this.user.refreshToken
    };

    return this.http.post<RefreshToken>(urls.refreshToken, body)
      .pipe(
        tap(res => {
          this.setToken(res.token, res.refreshToken);
        }),
        catchError((err) => {
          console.log(err);
          this.setAuthorized(null);
          return throwError('Error update Token!');
        })
      );
  }

  setToken(token: string, refreshToken: string): void {
    this.user.token = token;
    this.user.refreshToken = refreshToken;
    this.saveCookie();
  }

  logIn({login, password}): Observable<User> {
    return this.http.post<User>(urls.login, {login, password});
  }

  registration(obj: Registration): Observable<Registration> {
    return this.http.post<Registration>(urls.registration, this.regMapper(obj));
  }
}
