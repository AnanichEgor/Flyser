import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {urls} from '../../shared/consts';
import {Client} from '../../doctor/services/doctor.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }


  getClientsInfo(id: string): Observable<Client> {
    return this.http.get<Client>(urls.clientInfo.replace('{0}', id));
  }
}
