import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { BatchListComponent } from './components/batches/batch-list/batch-list.component';
import { BatchEditComponent } from './components/batches/batch-edit/batch-edit.component';

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
  { path: 'batches', component: BatchListComponent, canActivate: [AuthGuard] },
  {
    path: 'batch/create',
    component: BatchEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batch/edit/:id',
    component: BatchEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
