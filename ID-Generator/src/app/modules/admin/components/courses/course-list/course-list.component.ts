import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { merge, tap } from 'rxjs';
import { CourseDataSource } from 'src/app/modules/core/datasources/courses-datasource';
import { Course } from 'src/app/modules/core/models/course';
import { CourseService } from 'src/app/modules/core/services/course.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  tableColumns: string[] = [
    'id',
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

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new CourseDataSource(this.courseService);
    this.dataSource.loadCourses(0);
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCoursesPage()))
      .subscribe();
  }

  loadCoursesPage() {
    this.dataSource.loadCourses(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
