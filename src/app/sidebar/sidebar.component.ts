import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { DatabaseService } from '../shared/database.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit  {
  profile: any;
  userInfoSub: Subscription;
  
  constructor(public authService: AuthService, private databaseService: DatabaseService) { 
    const profile = localStorage.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
    }
    this.authService.onLoggedIn.subscribe(updatedProfile => {
      this.profile = updatedProfile;
      console.log(this.profile);
    });
  }

  ngOnInit() {
    this.databaseService.getUserInfo()
      .subscribe(
        (userInfo: any) => this.profile = userInfo,
        (err) => console.log(err.message || err)
      );
  }
}
