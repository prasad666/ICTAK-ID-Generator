import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { CourseDataSource } from 'src/app/modules/core/datasources/courses-datasource';
import { Course } from 'src/app/modules/core/models/course';
import { CourseService } from 'src/app/modules/core/services/course.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  tableColumns: string[] = [
    '_id',
    'course_name',
    'enabled',
    'createdAt',
    'actions',
  ];

  dataSource!: CourseDataSource;
  course!: Course;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new CourseDataSource(this.courseService);
    this.dataSource.loadCourses(0);
  }

  ngAfterViewInit() {
    // reset the paginator after sorting

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          if (this.input.nativeElement.value.length > 3) {
            this.paginator.pageIndex = 0;
            this.loadCoursesPage();
          }
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCoursesPage()))
      .subscribe();
  }

  loadCoursesPage() {
    this.dataSource.loadCourses(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10,
      this.input.nativeElement.value,
      this.sort?.active ?? '_id',
      this.sort?.direction ?? 'asc'
    );
  }

  createObject(ev: Event) {
    this.router
      .navigate(['/backend/admin/course/create'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
  editObject(el: any) {
    this.router
      .navigate([
        '/backend/admin/course/edit/' +
          el._elementRef.nativeElement.getAttribute('data-id'),
      ])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  deleteObject(el: any) {
    let objId = el._elementRef.nativeElement.getAttribute('data-id');
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to delete this course ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.courseService.delete(objId).subscribe((res) => {
            console.log(res);
            this.loadCoursesPage();
          });
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }
}
