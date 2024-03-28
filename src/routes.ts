/**
 * An array of public routes that do not require authentication.
 */
export const publicRoutes = ['/'];

export const authRoutes = ['/login', '/auth/register', '/auth/forgot-password'];

export const apiAuthPrefix = '/api/auth';

export const USER_LOGIN_REDIRECT = '/';
export const ADMIN_LOGIN_REDIRECT = '/dashboard';

export const employeeRoute = ['/dashboard', '/dashboard/manage-orders'];
