import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [

  {path: "home", component: HomeComponent, title: 'Home'},
  {path: "about-us", component: AboutusComponent, title: 'About Us'},
  {path: "faqs", component: FaqsComponent, title: 'FAQs'},
  {path: "contact-us", component: ContactusComponent, title: 'Contact Us'},
  {path: "login", component: LoginComponent, title: 'Login'},
  {path: "register", component: RegisterComponent, title: 'Register'},
  {path: "forgot-password", component: ForgotpasswordComponent, title: 'Forgot Password'},
  {path: "reset-password/:token", component: ResetpasswordComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
