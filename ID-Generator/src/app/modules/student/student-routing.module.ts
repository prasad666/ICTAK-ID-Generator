import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdGenerationComponent } from './components/id-generation/id-generation.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';

const routes: Routes = [{
  path: "", 
  component: StudentHomeComponent,
  children : [
    { path:'', component:DashboardComponent },
    { path:'applications', component:IdGenerationComponent },
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
