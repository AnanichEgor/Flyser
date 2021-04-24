import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SidebarService} from './services/sidebar.service';
import {Client} from '../doctor/services/doctor.service';

export enum SIDEBAR {
  admin = 'admin',
  doctor = 'doctor',
  doctor_client = 'doctor_client',
  client = 'client',
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  SIDEBAR = SIDEBAR;
  @Input() state: SIDEBAR;
  @Input() image: string;
  @Input() client: Client;

  get photo(): string {
    return this.image ?? 'assets/img/doctor.jpg';
  }

  constructor(public sidebarService: SidebarService) {
  }

  ngOnInit(): void {
  }

}
