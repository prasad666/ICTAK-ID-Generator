import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css'],
})
export class AuthHeaderComponent implements OnInit {
  @Input() componentTitle: string = 'ICTAK Administration';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogOut() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleClicked() {
    document.body.classList.toggle('sb-sidenav-toggled');
  }
}
