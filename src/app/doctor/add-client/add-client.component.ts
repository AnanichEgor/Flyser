import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {emailPattern} from '../../shared/consts';
import {TypeNotification, UtilsService} from '../../shared/services/utils.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  formClient: FormGroup;

  constructor(
    private doctorService: DoctorService,
    private utils: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.formClient = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl('', [Validators.email, Validators.pattern(emailPattern)]),
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
    this.doctorService.registration(this.formClient)
      .subscribe(
        registration => {
          this.utils.translateNotification('registration.successCreate');
        },
        err => {
          this.utils.translateNotification('registration.processError', TypeNotification.danger);
        }
      );
  }
}
