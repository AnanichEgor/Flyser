import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

// @ts-ignore
import Data from './../../assets/i18n/en.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {

  formSignIn: FormGroup;
  login = Data.login;
  shorts = Data.shorts;

  constructor(
    private userService: UserService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.formSignIn = new FormGroup({
      login: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  onSubmit(): void {

    console.log(this.formSignIn.value);
    this.userService.logIn(this.formSignIn.value)
      .subscribe(
        user => {
          this.userService.setAuthorized(user);
          return this.route.navigate(['/']);
        },
        err => {
          this.userService.setAuthorized(null);
          if (!environment.production) {
            console.error(err);
          }
        }
      );
  }
}
