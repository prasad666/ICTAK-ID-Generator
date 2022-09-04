import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    RegisterComponent,
    FaqsComponent,
    ContactusComponent,
    ForgotpasswordComponent,
    LoginComponent,
    ResetpasswordComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[

  ]
})
export class PagesModule { }
