import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

export interface Registration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  birthday: Date;
  gender: string;
  cod: string;
  phone: string;
  usefulInformation: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: any;
  public selected = false;
  @Output() create = new EventEmitter<Registration>();


  forceNumeric(input): void {
    input.target.value = input.target.value.replace(/[^\d]+/g, '');
  }

  mather(field: AbstractControl): { [key: string]: boolean } | null {
    const password = this.formRegister.get('password');
    if (password.pristine || field.pristine) {
      return null;
    }
    if (password.value === field.value) {
      return null;
    }
    return {match: true};
  }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthday: new FormControl(''),
      usefulInformation: new FormControl(''),
      gender: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      cod: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^.*(?=.{3,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\d\\x]).*$')]),
      confirm: new FormControl('')
    });
    // passwordMatcher - dependent validator from password field.
    this.formRegister.get('confirm').setValidators([Validators.required, this.mather.bind(this)]);
  }

  onRegistry(): void {
    this.create.emit(this.formRegister.value);
  }
}
