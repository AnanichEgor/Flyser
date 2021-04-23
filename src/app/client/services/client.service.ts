import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {urls} from '../../shared/consts';
import {Client} from '../../doctor/services/doctor.service';
import {HttpClient} from '@angular/common/http';
import {TypeNotification, UtilsService} from '../../shared/services/utils.service';
import {ROLE} from '../../login/services/user.service';

export enum COURSE_STATUS {
  inProgress = 'IN_PROGRESS'
}

export interface ClientInfo {
  doctorId: string;
  parent: Client;
  role: ROLE;
}

export interface Course {
  course: string;
  courseUrl: string;
  courseStart: Date;
  courseEnd: Date;
  courseStatus: COURSE_STATUS;
  locations: object;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientInfo: ClientInfo;

  constructor(private http: HttpClient, private utils: UtilsService) {
  }

  getClientsInfo(id: string): Observable<Client> {
    return new Observable<Client>(observer => {
        this.http.get<ClientInfo>(urls.clientInfo.replace('{0}', id))
          .subscribe(
            (data: ClientInfo) => {
              this.clientInfo = data;
              console.log('clientInfo: ', this.clientInfo);
              observer.next(data.parent);
            },
            error => this.utils.translateNotification('registration.getServerError', TypeNotification.danger)
          );
      }
    );
  }

  getCorrectionCourses(id: string): Observable<Course[]> {
    return this.http.get<Course[]>(urls.correctionCourse.replace('{0}', id));
  }
}
