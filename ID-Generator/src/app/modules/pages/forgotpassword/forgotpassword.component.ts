import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  message = '';
  loading = false;

  constructor(private auth: AuthService) {
    // const body = document.getElementsByTagName('body')[0];
    // body.classList.add('bg-primary');
   }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required)
  })

  onSubmit(){
    this.loading = true;
    this.message = "";
    this.auth.forgotPassword(this.form.value).subscribe({
      next: (data)=>{
        this.loading = false;
        this.message = `Password reset link has been sent to ${this.form.value.email} (If not found in inbox, check spam folder.)`
      },
      error: (error)=>{
        this.loading = false;
        this.message = error.error.message||'something went wrong';
        console.log(error);
        
      }
    })
  }

}
