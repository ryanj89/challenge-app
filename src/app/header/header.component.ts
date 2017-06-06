import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.authenticated;
  }
}
