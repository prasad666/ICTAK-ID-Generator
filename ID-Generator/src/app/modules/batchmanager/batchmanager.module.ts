import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { BatchmanagerRoutingModule } from './batchmanager-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BatchManagerHomeComponent } from './components/batch-manager-home/batch-manager-home.component';
import { ApplicationsComponent } from './components/applications/applications.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    BatchManagerHomeComponent,
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    BatchmanagerRoutingModule,
    SharedModule,
  ]
})
export class BatchmanagerModule { }
