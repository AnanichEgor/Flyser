import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SIDEBAR} from 'src/app/sidebar/sidebar.component';
import {Client} from '../../doctor/services/doctor.service';
import {UtilsService} from '../../shared/services/utils.service';
import {AvailableCourse, ClientService, Course} from '../services/client.service';
import {SidebarService} from '../../sidebar/services/sidebar.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

const availableCoursesMock: AvailableCourse = {
  id: 'hoverbike',
  courseName: 'hoverbike',
  courseIcon: 'https://pbs.twimg.com/profile_images/2811079982/606e04946d47fcb17ab308baf3ac81f5_400x400.jpeg',
  sessions: 25
};

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
  SIDEBAR: SIDEBAR;
  clientInfo: Client;
  courses: Course[];
  availableCourses: AvailableCourse[];
  ages: string;
  subscription: Subscription;
  clientId: string;

  constructor(
    private clientService: ClientService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private location: Location
  ) {
    this.subscription = this.sidebarService.toBack$.subscribe(event => this.onBack());
  }

  onBack(): void {
    if (!this.availableCourses) {
      this.location.back();
    } else {
      this.load();
    }
  }

  readCourses(id: string): void {
    this.clientService.getCorrectionCourses(id).subscribe((data: Course[]) => {
      this.courses = data;
      this.availableCourses = null; // need to switching
    }, (error) => this.utils.serverError(error));
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    this.readCourses(this.clientId);

    this.clientService.getClientsInfo(this.clientId).subscribe((data: Client) => {
      this.clientInfo = data;
      this.ages = this.utils.getDiffAgeNow(this.clientInfo.children.birthDay);
    });
  }

  addCourse(): void {
    this.clientService.getAvailableCourses().subscribe((data: AvailableCourse[]) => {
      this.availableCourses = data;
      this.courses = null;  // need to switching
    }, (error) => {
      this.utils.serverError(error);
      this.courses = null;
      this.availableCourses = [availableCoursesMock];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onActivation(id: string): void {
    this.clientService.activationCurse(this.clientId, id);
  }
}
