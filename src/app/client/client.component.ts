import {Component, OnInit} from '@angular/core';
import {Client, DoctorService} from '../doctor/services/doctor.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TypeNotification, UtilsService} from '../shared/services/utils.service';
import {ClientService} from './services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  info: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private utils: UtilsService) {
  }

  readClient(id: string): void {
    this.clientService.getClientsInfo(id).subscribe((data: Client) => {
      this.info = data;
      console.log(this.info);
    }, error => this.utils.translateNotification('registration.getServerError', TypeNotification.danger));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.readClient(params.id);
    });
  }
}
