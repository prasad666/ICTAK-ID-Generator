import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { 
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-primary');
   }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(false)

  });

  onSubmit(){
    this.auth.login(this.form.value).subscribe({
      next: (data:any) => {
        this.auth.setUser(data.token, data.user);
        if(this.form.value.remember){
          this.auth.storeUser(data.token, data.user);
        }
        console.log(data);
        alert('success')   //change this..redirect to home     
      },
      error: (err:any) => {
        console.log(err);
        alert('failed')// change this
        
      }
    })
  }
}
