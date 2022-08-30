import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [RegistrationService, CourseService],
})
export class CoreModule {}
