import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAuthGuard } from 'src/app/shared/services/guard/student-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdApplicationComponent } from './components/id-application/id-application.component';

const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate:[StudentAuthGuard]},
  {path: "application", component: IdApplicationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
