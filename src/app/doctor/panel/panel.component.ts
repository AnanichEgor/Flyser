import {Component, OnInit} from '@angular/core';
import {Client, DoctorService} from '../services/doctor.service';
import {TypeNotification, UtilsService} from '../../shared/services/utils.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  clients: Client[];

  constructor(private doctorService: DoctorService, private utils: UtilsService) {
  }

  ngOnInit(): void {
    this.doctorService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    }, error => this.utils.translateNotification('registration.getServerError', TypeNotification.danger));
  }

}
