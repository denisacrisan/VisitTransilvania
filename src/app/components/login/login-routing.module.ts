import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';

import { LoginComponent } from './login.component';

const routes: Routes = [
    Route.withShell([
        { path: 'login', component: LoginComponent, data: { title: extract('Login') } }
    ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
