import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

export class CourseDataSource implements DataSource<Course> {
  private courseSubject = new BehaviorSubject<Course[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  hasNextPage = false;

  hasPrevPage = false;
  limit = 10;
  nextPage = 1;
  page = 1;
  pagingCounter = 1;
  prevPage = null;
  totalDocs = 0;
  totalPages = 0;

  constructor(private coursesService: CourseService) {}

  connect(collectionViewer: CollectionViewer): Observable<Course[]> {
    return this.courseSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.courseSubject.complete();
    this.loadingSubject.complete();
  }

  loadCourses(
    pageIndex = 0,
    pageSize = 10,
    filter = '',
    sortDirection = 'asc'
  ) {
    this.loadingSubject.next(true);

    this.coursesService
      .getCourses(pageIndex + 1, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((courses: any) => {
        this.hasPrevPage = courses.hasPrevPage;
        this.limit = courses.limit;
        this.nextPage = courses.nextPage;
        this.page = courses.page;
        this.pagingCounter = courses.pagingCounter;
        this.prevPage = courses.prevPage;
        this.totalDocs = courses.totalDocs;
        this.totalPages = courses.totalPages;
        this.courseSubject.next(courses.docs);
      });
  }
}
