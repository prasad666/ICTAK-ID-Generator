import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Batch } from 'src/app/modules/core/models/batch';
import { User } from 'src/app/modules/core/models/user';
import { CourseService } from 'src/app/modules/core/services/course.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-batchmanager-edit',
  templateUrl: './batchmanager-edit.component.html',
  styleUrls: ['./batchmanager-edit.component.css'],
})
export class BatchmanagerEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  courses: any;
  users: any;
  userObj: any;
  isLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private courseService: CourseService
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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],

      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      end_date: ['', Validators.required],
      enabled: [true],
    });

    if (!this.isAddMode) {
      this.userService
        .getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          let user = <User>x;
          this.form.patchValue(user);
          this.userObj = user;
          this.isLoaded = true;
        });
    } else {
      this.userObj = <User>{};
      this.isLoaded = true;
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
      this.createBatch();
    } else {
      this.updateBatch();
    }
  }

  private createBatch() {
    this.userService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/batcchmanagers'], {
            state: { success: 'Batchmanager has been created successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }

  private updateBatch() {
    this.userService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/batchmanagers'], {
            state: { success: 'Bathchmanager has been updated successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }
}
