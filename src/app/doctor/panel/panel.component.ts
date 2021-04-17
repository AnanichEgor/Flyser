import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../services/doctor.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {


  constructor(private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.doctorService.getClients().subscribe(data => {
      console.log(data);
    });
  }

}
