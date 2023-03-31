// /<reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_FIREBASE_MESSAGING_KEY: string;
      REACT_APP_GOOGLE_API_KEY: string;
    }
  }
}

export {};
