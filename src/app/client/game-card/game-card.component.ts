import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output() onModalConfirm: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onModalClick(id: string): void {
    this.onModalConfirm.emit(id);
  }

  onClick(course: string): void {

  }
}
