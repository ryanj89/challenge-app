import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

import { AUTH_CONFIG } from './auth0-variables';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  DATABASE_URL_PRODUCTION: string = 'https://frozen-lowlands-52602.herokuapp.com/api/';
  DATABASE_URL_DEVELOPMENT: string = 'http://localhost:3000/api/';

  DATABASE_URL: string;
  profile: any;
  //  Configure auth0
  lockOptions = {
    auth: {
      redirectUrl: window.location.hostname === 'localhost' ? AUTH_CONFIG.REDIRECT_DEV : AUTH_CONFIG.REDIRECT_PROD,
      responseType: AUTH_CONFIG.RESPONSE_TYPE
    }
  };
  lock = new Auth0Lock(AUTH_CONFIG.CLIENT_ID, AUTH_CONFIG.CLIENT_DOMAIN, this.lockOptions);
  onLoggedIn: EventEmitter<any> = new EventEmitter<any>();


  constructor(private router: Router, private http: Http) {
    if (window.location.hostname === 'localhost') {
      this.DATABASE_URL = this.DATABASE_URL_DEVELOPMENT;
    } else {
      this.DATABASE_URL = this.DATABASE_URL_PRODUCTION;
    }
    // Listening for the authenticated event
    this.lock.on("authenticated", (authResult: any) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) return;
        // Query database to verify or setup user
        this.http.get(this.DATABASE_URL +'users?email=' + profile.email)
          .toPromise()
          .then(results => {
            const user = results.json();
            if (!user) {
              console.log('No user found!');
              this.http.post('users', profile)
                .toPromise()
                .then(results => {
                  const newUser = results.json();
                  profile.user_id = newUser[0].id;
                  this.onLoggedIn.emit(profile);
                  this.router.navigate(['/challenges']);
                });
            } else {
              console.log('User found!');
              profile.user_id = user.id;
            }
            console.log('Profile:', profile);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('profile', JSON.stringify(profile));
            this.onLoggedIn.emit(profile);
            this.router.navigate(['/challenges']);
          });
      });
    });

  }

  //  Login
  login() {
    this.lock.show();
  }

  //  Removes user's tokens from browser storage
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.onLoggedIn.emit(null);
    this.router.navigate(['/']);
  }

  //  Checks whether the access_token has expired
  isAuthenticated() {
    return tokenNotExpired('id_token');
  }

}