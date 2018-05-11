import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { SavesComponent } from './saves.component';

const routes: Routes = [
    
  // {
  //   path: '',
  //   redirectTo: 'calendar',
  //   pathMatch: 'full'
  // },
  {
    path: 'saves',
    component: SavesComponent,

  },
  {
    path: '',
    component: CalendarComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}