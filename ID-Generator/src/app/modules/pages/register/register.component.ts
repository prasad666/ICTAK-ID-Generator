import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationError:any;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void { }

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  }, this.matchPassword )


  //password match validator
  matchPassword(form:AbstractControl){
    const {password, confirmPassword } = form.value
    if(password === confirmPassword){
      return null;
    }
    return {passwordMismatch:true};
  }

  //submit form
  onSubmit(){
    this.auth.register(this.form.value).subscribe({
      next: (data:any) => {
        this.auth.setUser(data.token, data.user);
        this.router.navigate(['student']);     
      },
      error: (err:any) => {
        console.log(err);
        this.registrationError = err.error.message||'something went wrong';
      }
    })
  }

}
