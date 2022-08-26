import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdApplicationComponent } from './components/id-application/id-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    IdApplicationComponent,
    
            
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class StudentModule { }
