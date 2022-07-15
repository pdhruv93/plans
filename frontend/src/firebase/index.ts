import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'plans-1.firebaseapp.com',
  projectId: 'plans-1',
  storageBucket: 'plans-1.appspot.com',
  messagingSenderId: '759230950123',
  appId: '1:759230950123:web:02c5865e5d9de7537f6cae',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
