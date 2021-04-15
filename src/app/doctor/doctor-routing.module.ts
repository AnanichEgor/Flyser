import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../login/guards/auth.guard';
import {NgModule} from '@angular/core';
import {DoctorComponent} from './doctor.component';

const routes: Routes = [
  {path: 'doctor', canActivate: [AuthGuard], component: DoctorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DoctorRoutingModule {
}
