import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppTranslateModule} from '../shared/app-translate.module';
import {LoginRoutingModule} from '../login/login-routing.module';
import {DoctorComponent} from './doctor.component';
import { AddClientComponent } from './add-client/add-client.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    LoginRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [
    DoctorComponent,
    AddClientComponent,
  ],
  exports: [DoctorComponent]
})
export class DoctorModule {
}
