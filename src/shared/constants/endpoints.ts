export const AUTH_ENDPOINTS = {
  SIGNIN: '/auth/login',
  REFRESH_TOKEN: '/auth/tokens',
};

export const OAUTH_ENDPOINTS = {
  APPS: '/oauth/apps',
  SIGNUP_PROVIDER: (provider: string) => `/oauth/sign-up/${provider}`,
  SIGNIN_PROVIDER: (provider: string) => `/oauth/sign-in/${provider}`,
};

export const USER_ENDPOINTS = {
  SIGNUP: '/users',
};
