import { getMessaging, getToken } from 'firebase/messaging';

export const requestForToken = () => {
  const messaging = getMessaging();

  return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
