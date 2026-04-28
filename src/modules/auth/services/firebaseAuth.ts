import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  type User 
} from 'firebase/auth';
import type { AuthUser, UserRole } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mapFirebaseUserToAuthUser = async (user: User): Promise<AuthUser> => {
  const tokenResult = await user.getIdTokenResult();
  const role = (tokenResult.claims.role as UserRole) || 'VIEWER';

  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || 'User',
    photoURL: user.photoURL || undefined,
    role
  };
};

export const loginWithEmail = async (email: string, password: string): Promise<AuthUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return await mapFirebaseUserToAuthUser(userCredential.user);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChanged = (callback: (user: AuthUser | null) => void): (() => void) => {
  return firebaseOnAuthStateChanged(auth, async (user) => {
    if (user) {
      callback(await mapFirebaseUserToAuthUser(user));
    } else {
      callback(null);
    }
  });
};
