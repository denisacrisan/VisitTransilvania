import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';

import { RegisterComponent } from './register.component';

const routes: Routes = [
    Route.withShell([
        { path: 'register', component: RegisterComponent, data: { title: extract('Register') } }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class RegisterRoutingModule { }
