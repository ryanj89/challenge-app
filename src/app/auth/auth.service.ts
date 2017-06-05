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
    if (this.isAuthenticated()) {
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
      console.log('Parsing Hash...', authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/dashboard']);
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
    headers.append('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FSkJPRGhFTmpjMlJVRkdPRGM0UVVVNE9EazJRelk1TlRFMU1rWXpOak5FTkRZNFJVSTNNZyJ9.eyJpc3MiOiJodHRwczovL3J5bmouYXV0aDAuY29tLyIsInN1YiI6InByT1czd0Ftc2Q3S2lxNUNOQ2NPSmlSbWtZOElYTU1MQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3J5bmouYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTY3MzU5MTYsImlhdCI6MTQ5NjY0OTUxNiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMifQ.fHnmQdK4yRgmp1LXzkLOTm-jYZTFYjLULQFVXpIIOKOKYW18rFNrw7axJZ6nmPyJ5a9mVwx4_7KJ8iO2KzsIwSQHcgv9k2S4QyHYwZ2mmXfyVXDa2RcptjfCWfngBudHf4Jz7JU92sh7eEey95sFyucHcfn71ZwILocjmcGySKSxY2yvHmzB7d07aWzffN7UJkUQXvbvWhdcNJMWa0Z7UqlnRZWLzFTPNl9q3cE3eXHdZo71DI1rRK5p1-kA4KcVPpsTQYYhb6A3uocOsMaYGj8wgxoPcjAcrIez2e741MvogVn4wtkt3_6KgXbsF7yyYRz5aBQCSHRF_m7ybh9RDw');
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

}