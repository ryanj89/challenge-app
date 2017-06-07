import { AuthService } from '../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  profile: any;

  constructor(private authService: AuthService) { 
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
    }
    this.authService.onLoggedIn.subscribe(updatedProfile => {
      this.profile = updatedProfile;
    });
  }

}
