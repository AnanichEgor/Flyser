import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {CoursesListComponent} from './courses-list/courses-list.component';


const routes: Routes = [
    {
      path: 'client', component: ClientComponent, children: [
        {path: 'correction-course', component: CoursesListComponent}
      ]
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
