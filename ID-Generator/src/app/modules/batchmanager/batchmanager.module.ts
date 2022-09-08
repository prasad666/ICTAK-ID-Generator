import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { BatchmanagerRoutingModule } from './batchmanager-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BatchManagerHomeComponent } from './components/batch-manager-home/batch-manager-home.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    BatchManagerHomeComponent,
    ApplicationsComponent,
    ApplicationDetailsComponent
  ],
  imports: [
    CommonModule,
    BatchmanagerRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule   
    
  ]
})
export class BatchmanagerModule { }
