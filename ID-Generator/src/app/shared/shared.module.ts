import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuestNavComponent } from './guest-nav/guest-nav.component';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { GuestFooterComponent } from './guest-footer/guest-footer.component';
import { TestComponent } from './test/test.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';

@NgModule({
  declarations: [
    GuestNavComponent,
    GuestHeaderComponent,
    GuestFooterComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [    
    GuestNavComponent,
    GuestHeaderComponent,
    GuestFooterComponent, 
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthNavComponent,
    ]
})
export class SharedModule { }
