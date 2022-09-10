import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../core/services/registration.service';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';
import { Course } from '../../core/models/course';
import { Batch } from '../../core/models/batch';
import { catchError, finalize, of } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  studentDetails = {
    first_name: '',
    last_name: '',
    courseType: '',
    photo: '',
    emailId: '',
    password: '',
    phoneno: '',
    batch: '',
    courseStartDate: '',
    courseEndDate: '',
  };

  courses: Course[] = [];
  batches: Batch[] = [];
  selectedBatches: Batch[] = [];
  isLoaded = false;

  constructor(
    private registration: RegistrationService,
    private courseService: CourseService,
    private batchService: BatchService
  ) {}

  ngOnInit() {
    //await this.getCourses();
    Promise.all([this.getCourses(), this.getBatches()]).then(() => {
      this.isLoaded = true;
      console.log('Loaded');
    });
  }

  Registration() {
    this.registration.newStudent(this.studentDetails);
    console.log('Called');
    alert('Success');
  }

  async getCourses() {
    this.courseService
      .getAllEnabledCourses()
      .pipe(catchError(() => of([])))
      .subscribe((data: any) => {
        this.courses = data;
        console.log(data);
      });
  }

  async getBatches() {
    this.batchService
      .getAllEnabledBatches()
      .pipe(catchError(() => of([])))
      .subscribe((data: any) => {
        this.batches = data;
        console.log(data);
      });
  }

  onCourseChange(courseId: string | null) {
    this.selectedBatches = this.batches.filter(
      (item: Batch) => item.course == courseId
    );
  }

  onBatchChange(batchId: string | null) {
    let batch = this.batches.find((x) => x._id == batchId);
    this.studentDetails.courseStartDate = batch?.start_date
      ? batch?.start_date.substring(0, 10)
      : '';
    this.studentDetails.courseEndDate = batch?.end_date
      ? batch?.end_date.substring(0, 10)
      : '';
  }
}
