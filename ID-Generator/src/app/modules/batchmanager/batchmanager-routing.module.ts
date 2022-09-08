import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { BatchManagerHomeComponent } from './components/batch-manager-home/batch-manager-home.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';

const routes: Routes = [{
  path: "", 
  component: BatchManagerHomeComponent,
  children : [
    { path:'', component:DashboardComponent },
    { path:'applications', component:ApplicationsComponent },
    { path:'applications/:id', component:ApplicationDetailsComponent },
    
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchmanagerRoutingModule { }
