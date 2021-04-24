import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SIDEBAR} from 'src/app/sidebar/sidebar.component';
import {Client} from '../../doctor/services/doctor.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AvailableCourse, ClientService, Course} from '../services/client.service';

const availableCoursesMock: AvailableCourse = {
  id: 'hoverbike',
  courseName: 'hoverbike',
  courseUrl: 'https://pbs.twimg.com/profile_images/2811079982/606e04946d47fcb17ab308baf3ac81f5_400x400.jpeg',
  sessions: 25
};


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  SIDEBAR: SIDEBAR;
  clientInfo: Client;
  courses: Course[];
  availableCourses: AvailableCourse[];
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
    }, (error) => this.utils.serverError(error));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('clientId');
    this.readCourses(id);

    this.clientService.getClientsInfo(id).subscribe((data: Client) => {
      this.clientInfo = data;
      this.ages = this.utils.getDiffAgeNow(this.clientInfo.children.birthDay);
    });
  }

  addCourse(): void {
    this.clientService.getAvailableCourses().subscribe((data: AvailableCourse[]) => {
      this.availableCourses = data;
    }, (error) => {
      this.utils.serverError(error);
      this.courses = null;
      this.availableCourses = [availableCoursesMock];
    });
  }
}
