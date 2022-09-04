import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BatchListComponent } from './components/batches/batch-list/batch-list.component';
import { BatchEditComponent } from './components/batches/batch-edit/batch-edit.component';
import { BatchmanagerListComponent } from './components/batchmanagers/batchmanager-list/batchmanager-list.component';
import { BatchmanagerEditComponent } from './components/batchmanagers/batchmanager-edit/batchmanager-edit.component';
import { StudentEditComponent } from './components/students/student-edit/student-edit.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent,
    CourseListComponent,
    CourseEditComponent,
    BatchListComponent,
    BatchEditComponent,
    BatchmanagerListComponent,
    BatchmanagerEditComponent,
    StudentEditComponent,
    StudentListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
  ],
})
export class AdminModule {}
