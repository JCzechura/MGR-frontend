export const jwtConfig = {
    localStorageTokenKey: 'token',
    whitelistedDomains: ['localhost:8091'],
    blacklistedRoutes: ['http://localhost:8089/auth/token'],
};
