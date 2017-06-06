import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import auth0 from 'auth0-js';
import { tokenNotExpired } from 'angular2-jwt';

import { AUTH_CONFIG } from './auth0-variables';

@Injectable()
export class AuthService {

  userProfile: any;

  //  Create Auth0 WebAuth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: AUTH_CONFIG.RESPONSE_TYPE,
    audience: AUTH_CONFIG.AUDIENCE,
    redirectUri: AUTH_CONFIG.REDIRECT,
    scope: AUTH_CONFIG.SCOPE
  });

  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router, private http: Http) {
    if (this.authenticated) {
      this.setLoggedIn(true);
    }
  }

  //  Login
  login() {
    this.auth0.authorize({
      responseType: AUTH_CONFIG.RESPONSE_TYPE,
      redirectUri: AUTH_CONFIG.REDIRECT,
      audience: AUTH_CONFIG.AUDIENCE,
      scope: AUTH_CONFIG.SCOPE
    });
  }

  //  Update login status
  setLoggedIn(value: boolean) {
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  //  Looks for an authentication result in the URL hash and processes it with the parseHash method from auth0.js
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/challenges']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(`Error: ${err.error}`);
      }
    });
  }

  //  Use access token to retrieve user's profile and set session
  private _getProfile(authResult) {
    const userId = authResult.idTokenPayload.sub;
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${AUTH_CONFIG.ACCESS_TOKEN}`);
    let options = new RequestOptions({ headers: headers });
    this.http.get(`https://rynj.auth0.com/api/v2/users/${userId}`, options)
      .toPromise()
      .then(response => {
        const profile = response.json();
        console.log(profile);
        this._setSession(authResult, profile);
        this.userProfile = profile;
      });
    // this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
    //   console.log('Get Profile: ', profile);
    //   this._setSession(authResult, profile);
    //   this.userProfile = profile;
    // });
  }

  //  Sets user's access_token, id_token, and profile
  private _setSession(authResult, profile) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setLoggedIn(true);
  }

  //  Removes user's tokens from browser storage
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  //  Checks whether the expiry time for the access_token has passed
  isAuthenticated() : boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  get authenticated() {
    return tokenNotExpired('access_token');
  }
}