interface AuthConfig {
  ACCESS_TOKEN: string;
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  RESPONSE_TYPE: string;
  AUDIENCE: string;
  REDIRECT_PROD: string;
  REDIRECT_DEV: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1FSkJPRGhFTmpjMlJVRkdPRGM0UVVVNE9EazJRelk1TlRFMU1rWXpOak5FTkRZNFJVSTNNZyJ9.eyJpc3MiOiJodHRwczovL3J5bmouYXV0aDAuY29tLyIsInN1YiI6InByT1czd0Ftc2Q3S2lxNUNOQ2NPSmlSbWtZOElYTU1MQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3J5bmouYXV0aDAuY29tL2FwaS92Mi8iLCJleHAiOjE0OTY3MzU5MTYsImlhdCI6MTQ5NjY0OTUxNiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMifQ.fHnmQdK4yRgmp1LXzkLOTm-jYZTFYjLULQFVXpIIOKOKYW18rFNrw7axJZ6nmPyJ5a9mVwx4_7KJ8iO2KzsIwSQHcgv9k2S4QyHYwZ2mmXfyVXDa2RcptjfCWfngBudHf4Jz7JU92sh7eEey95sFyucHcfn71ZwILocjmcGySKSxY2yvHmzB7d07aWzffN7UJkUQXvbvWhdcNJMWa0Z7UqlnRZWLzFTPNl9q3cE3eXHdZo71DI1rRK5p1-kA4KcVPpsTQYYhb6A3uocOsMaYGj8wgxoPcjAcrIez2e741MvogVn4wtkt3_6KgXbsF7yyYRz5aBQCSHRF_m7ybh9RDw',
  CLIENT_ID: 'eHMDoODyPZoZJNmIiT8BN03Oe9XEf8nP',
  CLIENT_DOMAIN: 'rynj.auth0.com',
  RESPONSE_TYPE: 'token id_token',
  AUDIENCE: 'challenge-app-api',
  REDIRECT_PROD: 'https://take-the-challenge.net/callback',
  // REDIRECT_PROD: 'https://challenge-accepted-app-bf9de.firebaseapp.com/callback',
  REDIRECT_DEV: 'http://localhost:4200/callback',
  SCOPE: 'openid profile email read:user_idp_tokens'
};
