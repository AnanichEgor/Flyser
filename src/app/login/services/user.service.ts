import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {cookieName, urls} from '../../shared/consts';
import {Observable} from 'rxjs';
import {Registration} from '../register/register.component';
import {CookieService} from 'ngx-cookie-service';

export interface User {
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
      this.cookieService.set(cookieName, JSON.stringify(this.user), {expires: 7, sameSite: 'Lax'});
    }
  }

  get isAuthorized(): boolean {
    return this.authorize;
  }

  getToken(): string {
    return this.user.token;
  }

  logIn({login, password}): Observable<User> {
    return this.http.post<User>(urls.login, {login, password});
  }

  registration(obj: Registration): Observable<Registration> {
    return this.http.post<Registration>(urls.registration, this.regMapper(obj));
  }
}
