import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'plans-1.firebaseapp.com',
  projectId: 'plans-1',
  storageBucket: 'plans-1.appspot.com',
  messagingSenderId: '759230950123',
  appId: '1:759230950123:web:02c5865e5d9de7537f6cae',
};

// init firebase app
const app = initializeApp(firebaseConfig);

// get db connection
export const db = getFirestore(app);

// export auth
export const firebaseAuth = getAuth(app);
