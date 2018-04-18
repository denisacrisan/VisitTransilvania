import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent
  ],
  exports: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
