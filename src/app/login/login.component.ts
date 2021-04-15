import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import Modal from 'node_modules/bootstrap/js/dist/modal.js';
import {Registration} from './register/register.component';
import {TypeNotification, UtilsService} from '../shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  formSignIn: FormGroup;
  serverError = '';
  modalRegister = false;
  currentModal = null;

  constructor(
    private userService: UserService,
    private route: Router,
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.formSignIn = new FormGroup({
      login: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^.*(?=.{3,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\d\\x]).*$')])
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
    this.userService.logIn(this.formSignIn.value)
      .subscribe(
        user => {
          this.userService.setAuthorized(user, true);
          switch (user.role) {
            case 'ROLE_DOCTOR': {
              this.route.navigate(['/doctor']);
              break;
            }
          }
        },
        err => {
          this.userService.setAuthorized(null);
          if (!environment.production) {
            this.readStatus(err.status);
          }
        });
  }

  /**
   * @backdrop {boolean} is false - which doesn't close the modal on click.
   */
  openDialog(selectorID: string, backdrop: boolean = true): object {
    const modal = new Modal(document.getElementById(selectorID), {
      keyboard: true,
      backdrop
    });
    modal?.show();
    return modal;
  }

  onClickDoctor($event): void {
    this.modalRegister = true;
    this.currentModal = this.openDialog('register', false);
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

  Register(obj: Registration): void {
    this.userService.registration(obj)
      .subscribe(
        registration => {
          this.currentModal?.hide();
          this.utils.translateNotification('registration.successCreate');
        },
        err => {
          this.userService.setAuthorized(null);
          this.utils.translateNotification('registration.processError', TypeNotification.danger);
        }
      );
  }
}
