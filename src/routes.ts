/**
 * An array of public routes that do not require authentication.
 */
export const publicRoutes = ['/'];

export const authRoutes = ['/login', '/auth/register', '/auth/forgot-password'];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';
