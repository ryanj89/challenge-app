import { Component, NgZone, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobile: boolean;
  // isActive: boolean = false;

  isToggled: boolean;

  constructor(public authService: AuthService, public zone: NgZone) {
    const mql: MediaQueryList = window.matchMedia('(min-width:768px)');

    if (mql.matches) {
      this.isToggled = true;
    } else {
      this.isMobile = true;
    }

    mql.addListener((mql: MediaQueryList) => { 
      // zone.run(() => this.isToggled = mql.matches ? true : false)
      zone.run(() => {
        if (mql.matches) {
          this.isToggled = true;
          this.isMobile = false;
        } else {
          this.isToggled = false;
          this.isMobile = true;
        }
        // this.isToggled = mql.matches ? true : false
      })
    });
    console.log(this.isToggled);
  }

  ngOnInit() {
    if (localStorage.getItem('profile')) {
      this.authService.profile = JSON.parse(localStorage.getItem('profile'));
    }
  }

  onToggled(state: boolean) {
    this.isToggled = state;
  }

  onActive(state: boolean) {
    this.isToggled = !this.isToggled;
  }
}
