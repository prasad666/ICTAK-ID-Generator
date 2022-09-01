import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  @Input() componentTitle: string = 'ICTAK Administration';
  constructor() { }

  ngOnInit(): void {
  }

}
