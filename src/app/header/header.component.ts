import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  profile: any;
  @Output() onToggled = new EventEmitter<boolean>();
  toggled: boolean = true;

  constructor(public authService: AuthService) {
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
    }
    this.authService.onLoggedIn.subscribe(updatedProfile => {
      this.profile = updatedProfile;
    });
  }

  toggle(state: boolean) {
    this.onToggled.emit(state);
    this.toggled = !this.toggled;
  }
}
