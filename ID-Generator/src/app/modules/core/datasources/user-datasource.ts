import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

export class UserDatasource implements DataSource<User> {
  private userSubject = new BehaviorSubject<User[]>([]);
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

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers(
    role = '',
    pageIndex = 0,
    pageSize = 10,
    filter = '',
    sortColumn = '_id',
    sortDirection = 'asc'
  ) {
    console.log(sortColumn);
    this.loadingSubject.next(true);

    this.userService
      .getUsers(
        role,
        pageIndex + 1,
        pageSize,
        filter,
        sortColumn,
        sortDirection
      )
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((users: any) => {
        this.hasPrevPage = users.hasPrevPage;
        this.limit = users.limit;
        this.nextPage = users.nextPage;
        this.page = users.page;
        this.pagingCounter = users.pagingCounter;
        this.prevPage = users.prevPage;
        this.totalDocs = users.totalDocs;
        this.totalPages = users.totalPages;
        this.userSubject.next(users.docs);
      });
  }
}
