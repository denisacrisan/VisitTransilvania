
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/components/shared';
import { HomeModule } from './components/home/home.module';
import { AboutModule } from './components/about/about.module';
import { RegisterModule } from './components/register/register-module';
import { LoginModule } from './components/login/login.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from './core/storage/storage.service';
import { ApiHandler } from './core/api-handler/apiHandler';
import { HttpService } from './core/http/http.service';

import { UserService } from '@app/core/user/user.service';


@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    LoginModule,
    RegisterModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    ApiHandler,
    UserService,
    StorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
