import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SIDEBAR} from 'src/app/sidebar/sidebar.component';
import {Client} from '../../doctor/services/doctor.service';
import {TypeNotification, UtilsService} from '../../shared/services/utils.service';
import {ClientService, Course} from '../services/client.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  SIDEBAR: SIDEBAR;
  clientInfo: Client;
  courses: Course[];
  ages: string;

  constructor(
    private clientService: ClientService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {
  }

  readCourses(id: string): void {
    this.clientService.getCorrectionCourses(id).subscribe((data: Course[]) => {
      this.courses = data;
      console.log('courses:', this.courses);
    }, () => this.utils.translateNotification('registration.getServerError', TypeNotification.danger));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('clientId');
    this.readCourses(id);

    this.clientService.getClientsInfo(id).subscribe((data: Client) => {
      this.clientInfo = data;
      this.ages = this.utils.getDiffAgeNow(this.clientInfo.children.birthDay);
    });
  }

}
