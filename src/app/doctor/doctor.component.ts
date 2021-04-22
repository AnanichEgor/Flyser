import {Component, OnInit} from '@angular/core';
import {SIDEBAR} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  SIDEBAR: SIDEBAR;

  constructor(
  ) {
    this.SIDEBAR = SIDEBAR.doctor;
  }

  ngOnInit(): void {
  }

}
