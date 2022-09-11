import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { RegistrationService } from '../../registration.service';
import { jsPDF} from 'jspdf'



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  

  constructor(private registration:RegistrationService,public fb:FormBuilder,public el:ElementRef){}

  batch:any=['FSDC','BLOCK CHAIN','ARTIFICIAL INTELIGENTS'];
  submitted = false;

    registerForm=this.fb.group(
      {
         
          firstName:['',            
              [Validators.required,
              Validators.minLength(3),
              Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')],            
                  ],
          lastName: ['', [Validators.required]],         
          courseType:['',Validators.required],
          photo:['',Validators.required],
          emailId:['',
                   [Validators.required,
                   Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
                  ],
          phoneno:['',[Validators.required,
                    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]
                  ],
          batch:['',Validators.required],
          courseStartDate:['',Validators.required],
          courseEndDate:['',Validators.required]
      }
    );

  ngOnInit(): void {
  }
  get f(){  
    return this.registerForm.controls;  
  }  
  
  Registration(){
    // var data=JSON.parse(JSON.stringify(this.registerForm))
    this.registration.newStudent(this.registerForm.value);
    console.log("Called");    
    alert("Success");
  }
  
  
  createPdf(){
    if(this.registerForm.valid){
      let pdf = new jsPDF('p', 'mm', [1500, 1500])
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save("register form.pdf")
      }
    })
    console.log("pdf created");

    }else{
      alert("Registration incomplete;unable to make copy")
      return
    }
    
    
  }
}
