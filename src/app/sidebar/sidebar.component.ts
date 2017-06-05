import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  profile: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profile = this.authService.userProfile;
  }

}
