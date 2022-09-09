import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/modules/core/services/application.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  constructor(private applications: ApplicationService, private auth: AuthService, private router:Router) { }

  batchesString = this.auth.currentUser.batch?.join()||'63187d78142dce9cd46024b3';////change
  fromDate:any 
  toDate:any 
  showTable=false;

  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableColumns: string[] = [
    '_id',
    'createdAt',
    'status',
    'student_id',
  ];



  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  updateHistory(){
    let from = Date.parse(this.fromDate)
    let to = Date.parse(this.toDate)
    this.applications.getHistory(this.batchesString,from,to)
    .subscribe({ 
      next: (data:any)=> {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showTable=true;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
