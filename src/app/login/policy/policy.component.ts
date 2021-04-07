import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  onClose(event): void {
    if (event.target.className === 'outer' || event.target.tagName === 'BUTTON') {
      this.location.back();
    }
    console.log(event);

  }
}
