import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {PolicyComponent} from './policy/policy.component';
import bootstrap from 'node_modules/bootstrap/js/dist/modal.js';

// @ts-ignore
import Data from './../../assets/i18n/en.json';

// import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  formSignIn: FormGroup;
  serverError = '';

  constructor(
    private userService: UserService,
    private route: Router,
    // public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.formSignIn = new FormGroup({
      login: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required])
    });
  }

  setServerMessage(str: string): void {
    this.serverError = str;
    setTimeout(() => {
      this.serverError = '';
    }, 5000);
  }

  readStatus(status): string {
    switch (status) {
      case 200:
        return;
      case 401:
        this.setServerMessage('errors.unauthorized');
        break;
      case 403:
        this.setServerMessage('errors.forbidden');
        break;
      case 500:
        this.setServerMessage('errors.internalServerError');
        break;
    }
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
            this.readStatus(err.status);
          }
        }
      );
  }

  openDialog(selectorID: string): void {
    const myModal = new bootstrap(document.getElementById(selectorID), {
      keyboard: false
    });
    myModal?.show();
  }

  onClickDoctor($event): void {
    $event.preventDefault();
  }

  onClickPolicy($event): void {
    this.openDialog('policyModal');
    $event.preventDefault();
  }

  onClickTerms($event): void {
    this.openDialog('termsModal');
    $event.preventDefault();
  }
}
