import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseService } from './services/course.service';
import { BatchService } from './services/batch.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, SharedModule],
  providers: [RegistrationService, CourseService, BatchService, UserService],
})
export class CoreModule {}
