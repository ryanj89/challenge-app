interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  RESPONSE_TYPE: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'eHMDoODyPZoZJNmIiT8BN03Oe9XEf8nP',
  CLIENT_DOMAIN: 'rynj.auth0.com',
  RESPONSE_TYPE: 'token id_token',
  AUDIENCE: 'https://rynj.auth0.com/userinfo',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile read:user_idp_tokens'
};
