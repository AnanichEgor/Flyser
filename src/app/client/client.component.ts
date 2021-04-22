import {Component, OnInit} from '@angular/core';
import {Client} from '../doctor/services/doctor.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TypeNotification, UtilsService} from '../shared/services/utils.service';
import {ClientService} from './services/client.service';
import {SIDEBAR} from '../sidebar/sidebar.component';
import {ROLE, UserService} from '../login/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  SIDEBAR: SIDEBAR;

  info: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private userService: UserService) {
    this.SIDEBAR = userService.gerUser().role !== ROLE.ROLE_CLIENT ? SIDEBAR.doctor_client : SIDEBAR.client;
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
