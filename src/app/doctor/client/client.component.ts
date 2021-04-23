import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../services/doctor.service';
import {STATUS, RESULT} from '../services/doctor.service';
import {Router} from '@angular/router';
import {UtilsService} from '../../shared/services/utils.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {


  @Input() client: Client;
  STATUS = STATUS;
  RESULT = RESULT;

  constructor(private router: Router, public utils: UtilsService) {
  }

  ngOnInit(): void {
  }

  onClick(id: string): void {
    this.router.navigate(['client', 'correction-course'], {queryParams: {clientId: this.client.id}});
  }
}
