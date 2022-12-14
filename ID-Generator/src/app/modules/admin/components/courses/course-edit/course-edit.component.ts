import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CourseService } from 'src/app/modules/core/services/course.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      course_name: ['', Validators.required],
      enabled: [true],
    });

    if (!this.isAddMode) {
      this.courseService
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
    this.courseService
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
    this.courseService
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
