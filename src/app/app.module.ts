import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CalendarComponent } from './calendar.component';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DateFilter } from '../share/pipes/dateFilter.pipe';
import {TheaterDateFilter } from '../share/pipes/dateFilter.pipe';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './routing.module';
import { SavesComponent } from './saves.component';


@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
    
  ],
  declarations: [ AppComponent, CalendarComponent, SavesComponent, DateFilter, TheaterDateFilter ],
  bootstrap: [ AppComponent ]
})export class AppModule {}