// Exports TypeScript definitions for auth tokens and user credentials.
export type UserRole = 'ADMIN' | 'DOCTOR' | 'VIEWER';

/**
 * The currently authenticated user profile
 */
export interface AuthUser {
    /** Unique user ID provided by Firebase */
    uid: string;
    /** Registered email address */
    email: string;
    /** Full name for display in the UI */
    displayName: string;
    /** Optional URL to the user's avatar image */
    photoURL?: string;
    /** Assigned system role for access control */
    role: UserRole;
}
// interface was chosen to allow the addition of user preferences or session-specific metadata later.

/**
 * Data required for the login process
 */
export type LoginCredentials = {
    /** User's registered email address */
    email: string;
    /** User's secret password */
    password: string;
};
// type was chosen as this is a simple, fixed shape used for a single specific operation (form submission).