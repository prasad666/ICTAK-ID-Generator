import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  {
    path: 'course/create',
    component: CourseEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course/edit/:id',
    component: CourseEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
