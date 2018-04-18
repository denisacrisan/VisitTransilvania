import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
    { 
      path: 'reset-password', 
      component: ResetPasswordComponent, 
      data: { 
        title: extract('Reset-password') 
      },
    }, 
    {   
      path: 'reset-password/:code', 
      component: ResetPasswordComponent, 
      data: { 
        title: extract('Reset-password')
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class ResetPasswordRoutingModule { }
