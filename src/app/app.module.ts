import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtInterceptorService } from './authentication/jwt-interceptor.service';
import { JwtUnAuthorizedInterceptorService } from './authentication/jwt-un-authorized-interceptor.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigModule } from './app-config.module';
import { DataService } from './shared/data.service';

@NgModule({ 
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null)
        }
      }
    }),
    NoopAnimationsModule,
    AppConfigModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
