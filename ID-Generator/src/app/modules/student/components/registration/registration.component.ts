import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../registration.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  studentDetails={
    name:'',
    courseType:'',
    photo:'',
    emailId:'',
    phoneno:'',
    batch:'',
    courseStartDate:'',
    courseEndDate:''
   }

  constructor(private registration:RegistrationService) { }

  ngOnInit(): void {
  }

  Registration(){
     this.registration.newStudent(this.studentDetails);
    console.log("Called");    
    alert("Success");
  }
}
