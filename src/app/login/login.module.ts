import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register/register.component';
import {PolicyComponent} from './policy/policy.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppTranslateModule} from '../shared/app-translate.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../shared/material.module';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslateModule,
    MaterialModule,
    LoginRoutingModule,
    MatDialogModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PolicyComponent
  ],
  exports: []
})
export class LoginModule {
}
