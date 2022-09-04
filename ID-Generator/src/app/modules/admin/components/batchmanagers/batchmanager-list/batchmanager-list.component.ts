import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  merge,
  tap,
} from 'rxjs';
import { UserDatasource } from 'src/app/modules/core/datasources/user-datasource';
import { Course } from 'src/app/modules/core/models/course';
import { UserService } from 'src/app/modules/core/services/user.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';
@Component({
  selector: 'app-batchmanager-list',
  templateUrl: './batchmanager-list.component.html',
  styleUrls: ['./batchmanager-list.component.css'],
})
export class BatchmanagerListComponent implements OnInit {
  tableColumns: string[] = [
    '_id',
    'first_name',
    'last_name',
    'email',
    'enabled',
    'createdAt',
    'actions',
  ];

  dataSource!: UserDatasource;
  course!: Course;
  successMessage: any = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.data['batchmanager'];
    this.dataSource = new UserDatasource(this.userService);
    this.dataSource.loadUsers('batchmanager', 0);
    this.successMessage = history.state['success'];
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
            this.loadUsersPage();
          }
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      'batchmanager',
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10,
      this.input.nativeElement.value,
      this.sort?.active ?? '_id',
      this.sort?.direction ?? 'asc'
    );
  }

  createObject(ev: Event) {
    this.router
      .navigate(['/backend/admin/batchmanager/create'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
  editObject(el: any) {
    this.router
      .navigate([
        '/backend/admin/batchmanager/edit/' +
          el._elementRef.nativeElement.getAttribute('data-id'),
      ])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }

  deleteObject(el: any) {
    let objId = el._elementRef.nativeElement.getAttribute('data-id');
    this.confirmationDialogService
      .confirm('Please confirm..', 'Do you really want to delete this user ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          this.userService.delete(objId).subscribe((res) => {
            console.log(res);
            this.loadUsersPage();
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
