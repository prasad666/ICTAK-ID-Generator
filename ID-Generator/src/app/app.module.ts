import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { PagesModule } from './modules/pages/pages.module';
import { AdminModule } from './modules/admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './shared/services/auth-http.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BatchmanagerModule } from './modules/batchmanager/batchmanager.module';
import { StudentModule } from './modules/student/student.module';
import { CoreModule } from './modules/core/core.module';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    AdminModule,
    BatchmanagerModule,
    StudentModule,
    StudentModule,
    BatchmanagerModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor , multi:true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public title = 'ICTAK ID Generator';
}
