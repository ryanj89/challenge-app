import { DatabaseService } from '../shared/database.service';
import { UserService } from '../shared/user.service';
import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

import { AUTH_CONFIG } from './auth0-variables';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  profile: any;
  //  Configure auth0
  lockOptions = {
    auth: {
      redirectUrl: window.location.hostname === 'localhost' ? AUTH_CONFIG.REDIRECT_DEV : AUTH_CONFIG.REDIRECT_PROD,
      responseType: AUTH_CONFIG.RESPONSE_TYPE,
      params: { scope: 'openid profile email'}
    }
  };
  lock = new Auth0Lock(AUTH_CONFIG.CLIENT_ID, AUTH_CONFIG.CLIENT_DOMAIN, this.lockOptions);
  onLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private http: Http, private databaseService: DatabaseService, private userService: UserService) {
    // Listening for the authenticated event
    this.lock.on("authenticated", (authResult: any) => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) return;
        // Query database to verify or setup user
        this.http.get(this.databaseService.DATABASE_URL +'users?email=' + profile.email)
          .toPromise()
          .then(results => {
            const user = results.json();
            if (!user) {
              this.http.post(this.databaseService.DATABASE_URL + 'users', profile)
                .toPromise()
                .then(results => {
                  const newUser = results.json();
                  profile.user_id = newUser[0].id;
                  this.setSession(authResult, profile);
                  this.onLoggedIn.emit(profile);
                  this.router.navigate(['/challenges']);
                });
            } else {
              profile.user_id = user.id;
              profile.challenger_score = user.challenger_score;
              profile.submission_score = user.submission_score;
            }
            this.setSession(authResult, profile);
            this.onLoggedIn.emit(profile);
            this.router.navigate(['/challenges']);
          });
      });
    });

  }

  //  Set local storage tokens/profile
  setSession(authResult, profile) {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userService.setProfile(profile);
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