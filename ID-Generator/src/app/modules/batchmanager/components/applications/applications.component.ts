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
    'studentName',
    'email',
    'course',
    'batch',
    'registeredOn',
    'AppliedOn',
  ];
  numberOfPendingApplications:any;



  ngOnInit(): void {
    this.batchService.getBatchesByBatchManager(this.auth.currentUser._id)
    .subscribe({
      next:(data:any)=>{
        this.batchesString = data.map((e:any)=>e._id).join();
        this.applications.getPendingApplications(this.batchesString)
        .subscribe({ 
          next: (data:any)=> {
            this.numberOfPendingApplications= data.length;
            let modifiedData = data.map((e:any)=>{
              return {
                '_id':e._id,
                'studentName':e.student_id.first_name+' '+e.student_id.first_name,
                'email':e.student_id.email,
                'course':e.batch_id.course.course_name,
                'batch':e.batch_id.batch_name,
                'registeredOn':e.student_id.createdAt,
                'AppliedOn':e.updatedAt,
              }
            })
            this.dataSource = new MatTableDataSource<any>(modifiedData);
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
