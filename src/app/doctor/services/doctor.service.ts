import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../shared/consts';
import {FormGroup} from '@angular/forms';

export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  email: string;
  phoneCode: string;
  phone: string;
  children: {
    id?: string
    firstName: string;
    lastName: string;
    photoUrl?: string;
    birthDay: Date;
    sex?: string;
    diagnosis: string;
    notes: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  clientMapper(form: FormGroup): Client {
    const values = form.value;
    return {
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      city: values.city,
      address: values.address,
      email: values.email,
      phoneCode: values.phoneCode,
      phone: values.phone,
      children: {
        firstName: values.childrenFirstName,
        lastName: values.childrenLastName,
        photoUrl: '',
        birthDay: values.childrenBirthDay,
        sex: values.childrenSex,
        diagnosis: values.childrenDiagnosis,
        notes: values.childrenNotes
      }
    };
  }


  registration(form: FormGroup): Observable<Client[]> {
    return this.http.post<Client[]>(urls.registrationClient, this.clientMapper(form));
  }

  getClients(): Observable<any> {
    return this.http.get<any>(urls.clients);
  }
}

