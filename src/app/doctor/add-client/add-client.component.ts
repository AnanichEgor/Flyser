import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Client {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phoneCode: string;
  phone: string;
  children: {
    firstName: string;
    lastName: string;
    photoUrl: string;
    birthDay: Date;
    sex: string;
    diagnosis: string;
    notes: string
  };
}

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  formClient: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.formClient = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      phoneCode: new FormControl(''),
      phone: new FormControl(''),
      status: new FormControl(''),
      childrenFirstName: new FormControl(''),
      childrenLastName: new FormControl(''),
      // childrenPhotoUrl: new FormControl(''),
      childrenBirthDay: new FormControl(),
      childrenSex: new FormControl(''),
      childrenDiagnosis: new FormControl(''),
      childrenNotes: new FormControl(''),
    });
  }

  onSubmit(): void {
    console.log(this.formClient);
    console.log(this.formClient.value);
  }
}
