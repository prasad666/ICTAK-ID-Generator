import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchmanagerRoutingModule } from './batchmanager-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BatchmanagerRoutingModule
  ]
})
export class BatchmanagerModule { }
