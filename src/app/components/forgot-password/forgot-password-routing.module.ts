import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';

import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
    Route.withShell([
         { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: extract('Forgot-password') } }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ForgotPasswordRoutingModule { }

