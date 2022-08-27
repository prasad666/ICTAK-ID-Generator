import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [RegistrationService]
})
export class CoreModule { }
