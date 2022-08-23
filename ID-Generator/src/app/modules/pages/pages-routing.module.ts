import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {path: "home", component: HomeComponent},
  {path: "about-us", component: AboutusComponent},
  {path: "faqs", component: FaqsComponent},
  {path: "contact-us", component: ContactusComponent},
  {path: "login", component: LoginComponent},
  {path: "forgot-password", component: ForgotpasswordComponent},
  {path: "register", component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
