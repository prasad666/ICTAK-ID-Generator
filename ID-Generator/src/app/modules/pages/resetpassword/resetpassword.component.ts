import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  message = '';
  token:any = this.activRoute.snapshot.paramMap.get('token');
  constructor(private auth: AuthService,private activRoute:ActivatedRoute, private router:Router) { }

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
    
    this.auth.resetPassword(this.form.value,this.token).subscribe({
      next: (data)=>{
        this.router.navigate(['pages/login']);     
      },
      error: (error)=>{
        this.message = error.message;
      }
    })
  }

}
