import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('profile')) {
      this.authService.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  isAuthenticated() {
    return this.authService.authenticated;
  }
}
