import {Component, OnInit} from '@angular/core';
import {Client} from '../doctor/services/doctor.service';
import {ActivatedRoute, Params} from '@angular/router';
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
  client: Client;

  constructor(
    public clientService: ClientService,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.SIDEBAR = userService.gerUser().role !== ROLE.ROLE_CLIENT ? SIDEBAR.doctor_client : SIDEBAR.client;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('clientId');
    this.clientService.getClientsInfo(id).subscribe((data: Client) => {
      this.client = data;
    });
  }
}
