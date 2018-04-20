import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ContactComponent } from './contact.component';

const routes: Routes = [
    Route.withShell([
        { path: 'contact', component: ContactComponent, data: { title: extract('Contact') } }
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ContactRoutingModule { }

