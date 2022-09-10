import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IdGenerationComponent } from './components/id-generation/id-generation.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    IdGenerationComponent,
    StudentHomeComponent,
    
            
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule
  ]
})
export class StudentModule { }
