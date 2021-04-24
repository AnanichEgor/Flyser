import {Component, Input, OnInit} from '@angular/core';
import {SidebarService} from './services/sidebar.service';

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

  get photo(): string {
    return this.image ?? 'assets/img/doctor.jpg';
  }

  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
  }

}
