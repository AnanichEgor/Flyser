import {Component, Input, OnInit} from '@angular/core';
import {STATUS} from '../../doctor/services/doctor.service';
import {AvailableCourse, Course, COURSE_STATUS} from '../services/client.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  COURSE_STATUS = COURSE_STATUS;

  @Input() course: Course;
  @Input() availableCourse: AvailableCourse;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(id: any) {

  }
}
