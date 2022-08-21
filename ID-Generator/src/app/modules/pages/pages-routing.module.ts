import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {path: "home", component: HomeComponent},
  {path: "about-us", component: AboutusComponent},
  {path: "faqs", component: FaqsComponent},
  {path: "contact-us", component: ContactusComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
