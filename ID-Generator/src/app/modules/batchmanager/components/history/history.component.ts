import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

import { ApplicationService } from 'src/app/modules/core/services/application.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import * as XLSX from 'xlsx';



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
        this.historyData=data;
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

  //excel
  //@ViewChild('TABLE') table!: ElementRef;
  createExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.historyData) //table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
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
    
    doc.save('table.pdf')
  }

}
