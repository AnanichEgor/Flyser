import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './login/guards/auth.guard';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginRoutingModule} from './login/login-routing.module';
import {DoctorRoutingModule} from './doctor/doctor-routing.module';

const routers: Routes = [
  {path: '', canActivate: [AuthGuard], component: AppComponent},
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routers), LoginRoutingModule, DoctorRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
