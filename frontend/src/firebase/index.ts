import { Auth, getAuth } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';

export function getFirebaseApp(): FirebaseApp {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: 'plans-1.firebaseapp.com',
    projectId: 'plans-1',
    storageBucket: 'plans-1.appspot.com',
    messagingSenderId: '759230950123',
    appId: '1:759230950123:web:02c5865e5d9de7537f6cae',
  };

  const app = initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  return getAuth(app);
}
