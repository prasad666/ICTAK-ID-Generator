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

  constructor(private applicationService: ApplicationService, private route:ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
    this.applicationService.getApplication(this.id)
    .subscribe({ 
      next: (data:any)=> {
        this.application = data;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

  onApprove(){
    this.applicationService.approveApplication(this.id)
    .subscribe({ 
      next: (data:any)=> {
        this.router.navigate(['/backend/batchmanager/applications'])
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
  onReject(){
    this.applicationService.rejectApplication(this.id,'idk')
    .subscribe({ 
      next: (data:any)=> {
        this.router.navigate(['/backend/batchmanager/applications'])
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
