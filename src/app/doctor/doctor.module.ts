import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppTranslateModule} from '../shared/app-translate.module';
import {LoginRoutingModule} from '../login/login-routing.module';
import {DoctorComponent} from './doctor.component';
import { AddClientComponent } from './add-client/add-client.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PanelComponent } from './panel/panel.component';
import { ClientComponent } from './client/client.component';
import {HeaderModule} from '../header/header.module';
import {SidebarModule} from '../sidebar/sidebar.module';

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
    HeaderModule,
    SidebarModule,
    LoginRoutingModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [
    DoctorComponent,
    AddClientComponent,
    PanelComponent,
    ClientComponent
  ],
  exports: [DoctorComponent]
})
export class DoctorModule {
}
