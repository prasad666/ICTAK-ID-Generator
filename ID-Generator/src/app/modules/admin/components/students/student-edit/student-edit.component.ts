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
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', this.isAddMode ? Validators.required : null],
      role: ['student'],
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
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/students'], {
            state: { success: 'Student has been created successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }

  private updateUser() {
    this.userService
      .update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['backend/admin/students'], {
            state: { success: 'Student has been updated successfully.' },
          });
        },
        error: (error: any) => {
          this.loading = false;
        },
      });
  }
}
