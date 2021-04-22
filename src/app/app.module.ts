import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginModule} from './login/login.module';
import {AppTranslateModule} from './shared/app-translate.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DoctorModule} from './doctor/doctor.module';
import { ClientComponent } from './client/client.component';
import {ClientModule} from './client/client.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    DoctorModule,
    ClientModule,
    BrowserAnimationsModule, // required
    ToastNotificationsModule,
    AppTranslateModule,
    AppRoutingModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
