import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

admin.initializeApp();

// create user in the users collection whenever a new user signs in
export const createUserOnLogin = functions.auth.user().onCreate((user: UserRecord) =>
  admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      roles: ['user'],
      deviceId: '',
    }),
);