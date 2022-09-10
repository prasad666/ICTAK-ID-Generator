import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/modules/core/services/application.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

  application:any;
  id = this.route.snapshot.params['id'];
  remarks = '';
  loading = false;
  error ='';
 
  constructor(private applicationService: ApplicationService, private route:ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
    this.applicationService.getApplication(this.id)
    .subscribe({ 
      next: (data:any)=> {
        this.application = data;
        console.log(data);
        
      },
      error: (err)=> {
        console.log(err);
        this.error = 
          err.status === 500
          ? 'Something went wrong at server'
          : err.error.message ||
            'Something went wrong. Please check your connection';
      }
    })
  }

  onApprove(){
    this.loading= true;
    this.error = '';
    this.applicationService.approveApplication(this.id,this.remarks)
    .subscribe({ 
      next: (data:any)=> {
        this.router.navigate(['/backend/batchmanager/applications'])
      },
      error: (err)=> {
        this.loading= false;
        console.log(err);
        this.error = 
          err.status === 500
          ? 'Something went wrong at server'
          : err.error.message ||
            'Something went wrong. Please check your connection';
      }
    })
  }
  onReject(){
    this.loading= true;
    this.error = '';
    this.applicationService.rejectApplication(this.id,this.remarks)
    .subscribe({ 
      next: (data:any)=> {
        this.router.navigate(['/backend/batchmanager/applications'])
      },
      error: (err)=> {
        this.loading= false;
        console.log(err);
        this.error = 
          err.status === 500
          ? 'Something went wrong at server'
          : err.error.message ||
            'Something went wrong. Please check your connection';
      }
    })
  }

}
