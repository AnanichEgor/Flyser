import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public toBack$: EventEmitter<boolean>;

  constructor() {
    this.toBack$ = new EventEmitter();
  }

  toBack(): void {
    this.toBack$.emit(true);
  }
}
