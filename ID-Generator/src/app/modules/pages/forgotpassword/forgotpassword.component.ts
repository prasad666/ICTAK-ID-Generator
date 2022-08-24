import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private auth: AuthService) {
    // const body = document.getElementsByTagName('body')[0];
    // body.classList.add('bg-primary');
   }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl(null, Validators.required)
  })

  onSubmit(){
    this.auth.forgotPassword(this.form.value).subscribe({
      next: (data)=>{
        console.log(data);
      },
      error: (error)=>{
        console.log(error);
        
      }
    })
  }

}
