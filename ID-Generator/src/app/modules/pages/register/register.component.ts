import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../core/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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
