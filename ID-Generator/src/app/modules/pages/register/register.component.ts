import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../../core/services/registration.service';
import { CourseService } from '../../core/services/course.service';
import { BatchService } from '../../core/services/batch.service';
import { Course } from '../../core/models/course';
import { Batch } from '../../core/models/batch';
import { catchError, finalize, of } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  photo: File | undefined;
  submissionError = false;
  submitSuccess = false;
  courses: Course[] = [];
  batches: Batch[] = [];
  selectedBatches: Batch[] = [];
  isLoaded = false;
  start_date = '';
  end_date = '';

  constructor(
    private registration: RegistrationService,
    private courseService: CourseService,
    private batchService: BatchService,
    private formBuilder: FormBuilder
  ) {
    Promise.all([this.getCourses(), this.getBatches()]).then(() => {
      this.isLoaded = true;
      console.log('Loaded');
    });
  }

  ngOnInit() {
    //await this.getCourses();

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      photo: ['', Validators.required],
      course: ['', Validators.required],
      batch: ['', Validators.required],
      start_date: [],
      end_date: [],
      fileSource: [''],
    });
  }

  formSubmit() {
    this.submissionError = false;
    this.submitSuccess = false;

    const formData = new FormData();
    // for (let i in this.form.value) {
    //   formData.append(i, this.form.value[i]);
    // }
    formData.append('photo', this.form.get('fileSource')?.value);
    formData.append('first_name', this.form.get('first_name')?.value);
    formData.append('last_name', this.form.get('last_name')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('batch', this.form.get('batch')?.value);
    formData.append('course', this.form.get('course')?.value);
    formData.append('phone', this.form.get('phone')?.value);

    this.registration
      .newStudent(formData)
      .pipe(
        catchError(() => {
          this.submissionError = true;
          return of([]);
        })
      )
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.submissionError = true;
        } else {
          this.submitSuccess = true;
          this.form.reset();
        }

        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
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
    this.form.patchValue({
      start_date: batch?.start_date ? batch?.start_date.substring(0, 10) : '',
      end_date: batch?.end_date ? batch?.end_date.substring(0, 10) : '',
    });
  }

  getFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
