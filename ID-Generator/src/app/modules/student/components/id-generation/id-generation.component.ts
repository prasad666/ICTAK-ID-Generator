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

  data:any={status:null, remarks:null};
  constructor(private applicationService:ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.applicationStatus()
    .subscribe({
      next:(data)=>{
        this.data= data
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }

  onDownload(){
    this.applicationService.getPdf()
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
