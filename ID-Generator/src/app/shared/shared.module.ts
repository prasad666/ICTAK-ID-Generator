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
import { GuestBannerComponent } from './guest-banner/guest-banner.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AlertComponent } from './alert/alert.component';
import { ToastComponent } from './toast/toast.component';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [
    GuestNavComponent,
    GuestHeaderComponent,
    GuestFooterComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthNavComponent,
    GuestBannerComponent,
    ConfirmationDialogComponent,
    AlertComponent,
    ToastComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    GuestNavComponent,
    GuestHeaderComponent,
    GuestFooterComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthNavComponent,
    GuestBannerComponent,
    ConfirmationDialogComponent,
    AlertComponent,
  ],
  providers: [ConfirmationDialogService, ToastService],
})
export class SharedModule {}
