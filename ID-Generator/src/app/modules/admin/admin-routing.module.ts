import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { BatchListComponent } from './components/batches/batch-list/batch-list.component';
import { BatchEditComponent } from './components/batches/batch-edit/batch-edit.component';
import { StudentEditComponent } from './components/students/student-edit/student-edit.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { BatchmanagerEditComponent } from './components/batchmanagers/batchmanager-edit/batchmanager-edit.component';
import { BatchmanagerListComponent } from './components/batchmanagers/batchmanager-list/batchmanager-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path: 'batchmanagers',
    component: BatchmanagerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batchmanager/create',
    component: BatchmanagerEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batchmanager/edit/:id',
    component: BatchmanagerEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/create',
    component: StudentEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/edit/:id',
    component: StudentEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
