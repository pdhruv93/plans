// /<reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_MONGODB_APP_ID: string;
      REACT_APP_MONGODB_SYSTEM_API_KEY: string;
    }
  }
}

export {};
