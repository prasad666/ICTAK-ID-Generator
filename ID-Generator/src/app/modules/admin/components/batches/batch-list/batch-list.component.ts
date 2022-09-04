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
import { BatchesDatasource } from 'src/app/modules/core/datasources/batches-datasource';
import { Batch } from 'src/app/modules/core/models/batch';
import { BatchService } from 'src/app/modules/core/services/batch.service';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css'],
})
export class BatchListComponent implements OnInit {
  tableColumns: string[] = [
    '_id',
    'batch_name',
    'course',
    'user',
    'start_date',
    'end_date',
    'enabled',
    'createdAt',
    'actions',
  ];

  dataSource!: BatchesDatasource;
  batch!: Batch;
  successMessage: any = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private batchService: BatchService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.batch = this.route.snapshot.data['batch'];
    this.dataSource = new BatchesDatasource(this.batchService);
    this.dataSource.loadBatches(0);
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
            this.loadBatchesPage();
          }
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadBatchesPage()))
      .subscribe();
  }

  loadBatchesPage() {
    this.dataSource.loadBatches(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10,
      this.input.nativeElement.value,
      this.sort?.active ?? '_id',
      this.sort?.direction ?? 'asc'
    );
  }

  createObject(ev: Event) {
    this.router
      .navigate(['/backend/admin/batch/create'])
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
  editObject(el: any) {
    this.router
      .navigate([
        '/backend/admin/batch/edit/' +
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
          this.batchService.delete(objId).subscribe((res) => {
            console.log(res);
            this.loadBatchesPage();
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
