import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver'
import { ApplicationService } from 'src/app/modules/core/services/application.service';
@Component({
  selector: 'app-id-generation',
  templateUrl: './id-generation.component.html',
  styleUrls: ['./id-generation.component.css']
})
export class IdGenerationComponent implements OnInit {

  data:any=[{
    status:null,
    remarks:null,
    updatedAt:null,
    batch_id:{
      course:{course_name:null},
      batch_name:null
    },
  }];
  constructor(private applicationService:ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.applicationStatus()
    .subscribe({
      next:(data)=>{
        this.data= data
        console.log(data);
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }

  onDownload(id:any){
    this.applicationService.getPdf(id)
    .subscribe({
      next:(data)=>{
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(downloadURL);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
