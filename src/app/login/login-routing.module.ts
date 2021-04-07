import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register/register.component';
import {PolicyComponent} from './policy/policy.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {path: 'policy', component: PolicyComponent}
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
