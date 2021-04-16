import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register/register.component';
import {PolicyComponent} from './policy/policy.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppTranslateModule} from '../shared/app-translate.module';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {TermsComponent} from './terms/terms.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';

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
    LoginComponent,
    RegisterComponent,
    PolicyComponent,
    TermsComponent
  ],
  exports: [LoginComponent]
})
export class LoginModule {
}
