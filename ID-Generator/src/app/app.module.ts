import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { PagesModule } from './modules/pages/pages.module';
import { AdminModule } from './modules/admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './shared/services/auth-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    AdminModule,
    CommonModule
  ],
  exports: [SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
