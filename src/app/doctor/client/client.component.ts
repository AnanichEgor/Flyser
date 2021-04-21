import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../services/doctor.service';
import { STATUS, RESULT } from '../services/doctor.service';
import moment from 'moment';

const declension = ['год', 'года', 'лет'];

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client: Client;
  STATUS = STATUS;
  RESULT = RESULT;
  constructor() {
  }

  ngOnInit(): void {
  }

  private plural(num: number, titles = declension): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
  }

  get diffAgeNow(): string {
    const starts = moment(this.client.children.birthDay);
    const ends = moment();
    const result = ends.diff(starts, 'years');

    return `${result} ${this.plural(result)}`;
  }

}
