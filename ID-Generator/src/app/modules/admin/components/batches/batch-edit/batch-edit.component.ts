import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { BatchService } from 'src/app/modules/core/services/batch.service';
import { CourseService } from 'src/app/modules/core/services/course.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.css'],
})
export class BatchEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  courses: any;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private batchService: BatchService,
    private toastService: ToastService,
    private courseService: CourseService,
    private userService: UserService
  ) {
    this.courses = this.courseService
      .getAllCourses()
      .subscribe((res) => (this.courses = res));

    this.users = this.userService
      .getUsersByRole('batchmanager')
      .subscribe((res) => (this.users = res));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      batch_name: ['', Validators.required],
      course: ['', Validators.required],
      user: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      enabled: [true],
    });

    if (!this.isAddMode) {
      this.batchService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // this.toastService.showSuccessToast(
    //   'Success toast title',
    //   'This is a success toast message.'
    // );
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCourse();
    } else {
      this.updateCourse();
    }
  }

  private createCourse() {
    this.batchService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/courses'], {
            state: { success: 'Course has been created successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }

  private updateCourse() {
    this.batchService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/courses'], {
            state: { success: 'Course has been updated successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }
}
