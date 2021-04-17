import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../login/guards/auth.guard';
import {NgModule} from '@angular/core';
import {DoctorComponent} from './doctor.component';
import {AddClientComponent} from './add-client/add-client.component';
import {PanelComponent} from './panel/panel.component';

const routes: Routes = [
  {
    path: 'doctor', canActivate: [AuthGuard], component: DoctorComponent, children: [
      {path: 'panel', component: PanelComponent},
      {path: 'add_client', component: AddClientComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DoctorRoutingModule {
}
