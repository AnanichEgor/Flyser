import {Component, OnInit} from '@angular/core';
import {SIDEBAR} from '../sidebar/sidebar.component';
import {UserService} from '../login/services/user.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  SIDEBAR: SIDEBAR;

  constructor(public userService: UserService) {
    this.SIDEBAR = SIDEBAR.doctor;
  }

  ngOnInit(): void {
  }

}
