/**
 * An array of public routes that do not require authentication.
 */

export const privateRoutesPrefix = ['/dashboard', '/customer'];

export const authRoutes = ['/login', '/auth/register', '/auth/forgot-password'];

export const apiAuthPrefix = '/api/auth';

export const USER_LOGIN_REDIRECT = '/';
export const ADMIN_LOGIN_REDIRECT = '/dashboard';
export const LOGIN_REDIRECT = '/login'