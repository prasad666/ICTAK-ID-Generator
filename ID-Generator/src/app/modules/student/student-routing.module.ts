import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAuthGuard } from 'src/app/shared/services/guard/student-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: "", component: DashboardComponent, canActivate:[StudentAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
