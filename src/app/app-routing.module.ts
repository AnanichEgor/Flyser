import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './login/guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';

const routers: Routes = [
  {path: '', canActivate: [AuthGuard], component: AppComponent},
  {
    path: 'login',
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
