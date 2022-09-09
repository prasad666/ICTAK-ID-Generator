import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import { ApplicationService } from 'src/app/modules/core/services/application.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { BatchService } from 'src/app/modules/core/services/batch.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  constructor(private applications: ApplicationService,private batchService:BatchService, private auth: AuthService, private router:Router) { }

  batchesString = ""
  fromDate:any 
  toDate:any 
  showTable='hidden';
  historyData:any;

  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableColumns: string[] = [
    '_id',
    'createdAt',
    'status',
  ];



  ngOnInit(): void {
    this.batchService.getBatchesByBatchManager(this.auth.currentUser._id)
    .subscribe({
      next:(data:any)=>{
        this.batchesString = data.map((e:any)=>e._id).join();
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
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
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showTable='visible';
        this.historyData=data;
        
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

  //excel
  createExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.historyData) 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, `history (${this.fromDate} to ${this.toDate}).xlsx`);
  }

 
  //pdf
  createPdf(){
    const doc = new jsPDF();
    const col = ['_id', 'createdAt', 'status'];
    const rows:any = [];
    
    const itemNew = this.historyData;
    
    itemNew.forEach((element: { _id: any; createdAt: any; status: any; }) => {
      const temp = [element._id, element.createdAt, element.status];
      rows.push(temp);
    });
    
    autoTable(doc, {
      head: [col],
      body: rows,
    })
    
    doc.save(`history (${this.fromDate} to ${this.toDate}).pdf`)
  }

}
