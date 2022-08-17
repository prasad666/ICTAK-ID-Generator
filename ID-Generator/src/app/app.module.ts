import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageContentComponent } from './core/layout/page-content/page-content.component';
import { GuestTopNavComponent } from './core/layout/guest/guest-top-nav/guest-top-nav.component';
import { GuestFooterComponent } from './core/layout/guest/guest-footer/guest-footer.component';
import { GuestLayoutComponent } from './core/layout/guest/guest-layout/guest-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthorisedSideNavComponent } from './core/layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedLayoutComponent } from './core/layout/authorised/authorised-layout/authorised-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PageContentComponent,
    GuestTopNavComponent,
    GuestFooterComponent,
    GuestLayoutComponent,
    LandingPageComponent,
    AuthorisedSideNavComponent,
    AuthorisedLayoutComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
