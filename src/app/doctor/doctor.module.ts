import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppTranslateModule} from '../shared/app-translate.module';
import {LoginRoutingModule} from '../login/login-routing.module';
import {DoctorComponent} from './doctor.component';
import { AddClientComponent } from './add-client/add-client.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    LoginRoutingModule,
  ],
  declarations: [
    DoctorComponent,
    AddClientComponent,
  ],
  exports: [DoctorComponent]
})
export class DoctorModule {
}
