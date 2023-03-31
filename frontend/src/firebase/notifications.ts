import { db, firebaseAuth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import { toast } from 'react-toastify';

export const requestForToken = () => {
  const messaging = getMessaging();

  return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Updating notification token to users table at firestore....');
        // Update token to users table at firestore
        firebaseAuth.currentUser &&
          updateDoc(doc(db, 'users', firebaseAuth.currentUser.uid), {
            deviceId: currentToken,
          });
      } else {
        console.log('No registration token available. Request permission to generate one.');
        toast.error(
          'Notifications are turned off. You might miss important notifications about your upcoming plans',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      toast.error(
        'Notifications are turned off. You might miss important notifications about your upcoming plans',
      );
    });
};
