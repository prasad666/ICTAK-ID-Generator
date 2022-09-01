import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { IdApplicationComponent } from './components/id-application/id-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    // IdApplicationComponent,
    
            
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class StudentModule { }
