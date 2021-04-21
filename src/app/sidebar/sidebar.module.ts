import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {LoginRoutingModule} from '../login/login-routing.module';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
