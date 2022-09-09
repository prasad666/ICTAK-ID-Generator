import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/modules/core/services/application.service';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { BatchService } from 'src/app/modules/core/services/batch.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private applications: ApplicationService,private batchService:BatchService, private auth: AuthService, private router:Router) { }

  dataSource:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  batchesString = "";
  tableColumns: string[] = [
    '_id',
    'createdAt',
    'status',
    'student_id',
  ];



  ngOnInit(): void {
    this.batchService.getBatchesByBatchManager(this.auth.currentUser._id)
    .subscribe({
      next:(data:any)=>{
        this.batchesString = data.map((e:any)=>e._id).join();
        this.applications.getPendingApplications(this.batchesString)
        .subscribe({ 
          next: (data:any)=> {
            console.log(data);
            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err)=> {
            console.log(err);
          }
        })        
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
  
  onClick(applicationId:any){
    this.router.navigate(['/backend/batchmanager/applications/'+ applicationId])    
  }
}
