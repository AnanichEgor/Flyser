import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ClientComponent} from './client.component';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppTranslateModule} from '../shared/app-translate.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppTranslateModule,
    SidebarModule,
    RouterModule
  ]
})
export class ClientModule { }


