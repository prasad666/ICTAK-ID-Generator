import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestHeaderComponent } from './shared/guest-header/guest-header.component';
import { GuestFooterComponent } from './shared/guest-footer/guest-footer.component';
import { GuestNavComponent } from './shared/guest-nav/guest-nav.component';
import { AuthNavComponent } from './shared/auth-nav/auth-nav.component';
import { AuthHeaderComponent } from './shared/auth-header/auth-header.component';
import { AuthFooterComponent } from './shared/auth-footer/auth-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestHeaderComponent,
    GuestFooterComponent,
    GuestNavComponent,
    AuthNavComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
