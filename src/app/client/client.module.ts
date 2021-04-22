import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ClientComponent} from './client.component';



@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class ClientModule { }
