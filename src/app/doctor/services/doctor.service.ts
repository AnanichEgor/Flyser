import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../../shared/consts';
import {FormGroup} from '@angular/forms';

export enum SEX {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum STATUS {
  process = 'process',
  complete = 'complete',
  ready = 'ready',
  registry = 'registry'
}

export enum RESULT {
  normal = 'normal',
  good = 'good',
  excellent = 'excellent'
}

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
  status: string; // "father",
  children: {
    firstName: string;
    lastName: string;
    photoUrl?: string;
    birthDay: Date;
    sex?: SEX;
    diagnosis: string;
    notes: string;
    result?: RESULT,
    status?: STATUS,
    courses?: number
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
      status: values.status,
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

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(urls.clients);
  }
}

