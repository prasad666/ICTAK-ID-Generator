import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  message = '';
  token:any = this.activRoute.snapshot.paramMap.get('token');
  constructor(private auth: AuthService, private activRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, this.matchPassword)

  //password match validator
  matchPassword(form:AbstractControl){
    const {password, confirmPassword } = form.value
    if(password === confirmPassword){
      return null;
    }
    return {passwordMismatch:true};
  }

  onSubmit(){
    this.message = '';
    this.auth.resetPassword(this.form.value,this.token).subscribe({
      next: (data)=>{
        this.message = 'Your password has been reset. Plese login to continue. Redirecting to login page in 10 seconds'
        setTimeout(()=>{this.router.navigate(['pages/home']);}, 10000)
             
      },
      error: (error)=>{
        this.message = error.status===500 ? 'Something went wrong at server': error.error.message||'Something went wrong.Please check your connection';
      }
    })
  }

}
