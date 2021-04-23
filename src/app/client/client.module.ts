import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ClientComponent} from './client.component';
import {SidebarModule} from '../sidebar/sidebar.module';
import {AppTranslateModule} from '../shared/app-translate.module';
import {RouterModule} from '@angular/router';
import { GameCardComponent } from './game-card/game-card.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {HeaderModule} from '../header/header.module';



@NgModule({
  declarations: [ClientComponent, GameCardComponent, CoursesListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppTranslateModule,
    SidebarModule,
    RouterModule,
    HeaderModule
  ]
})
export class ClientModule { }


