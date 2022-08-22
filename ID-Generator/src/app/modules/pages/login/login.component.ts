import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-primary');
   }

  ngOnInit(): void {
  }

}
