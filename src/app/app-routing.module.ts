import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // Fallback when no prior route is matched
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
