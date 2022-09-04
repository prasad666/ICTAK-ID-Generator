import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Batch } from '../models/batch';
import { BatchService } from '../services/batch.service';

export class BatchesDatasource implements DataSource<Batch> {
  private batchSubject = new BehaviorSubject<Batch[]>([]);
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

  constructor(private batchesService: BatchService) {}

  connect(collectionViewer: CollectionViewer): Observable<Batch[]> {
    return this.batchSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.batchSubject.complete();
    this.loadingSubject.complete();
  }

  loadBatches(
    pageIndex = 0,
    pageSize = 10,
    filter = '',
    sortColumn = '_id',
    sortDirection = 'asc'
  ) {
    console.log(sortColumn);
    this.loadingSubject.next(true);

    this.batchesService
      .getBatches(pageIndex + 1, pageSize, filter, sortColumn, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((batches: any) => {
        console.log(batches);
        this.hasPrevPage = batches.hasPrevPage;
        this.limit = batches.limit;
        this.nextPage = batches.nextPage;
        this.page = batches.page;
        this.pagingCounter = batches.pagingCounter;
        this.prevPage = batches.prevPage;
        this.totalDocs = batches.totalDocs;
        this.totalPages = batches.totalPages;
        this.batchSubject.next(batches.docs);
      });
  }
}
