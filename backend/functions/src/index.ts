import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Triggered when the user authenticates for the first time in app
export const createUserOnLogin = functions.auth.user().onCreate((user) => {
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
    });
});

// return user details
export const getUserDetails = functions.https.onCall((data) => {
  return admin
    .firestore()
    .collection('users')
    .doc(data.userId)
    .get()
    .then((snapshot) => snapshot.data());
});

// create a plan in DB
export const createPlan = functions.https.onCall((data, context) => {
  admin
    .firestore()
    .collection('plans')
    .add({ ...data, creator: context.auth?.uid, attendees: [context.auth?.uid] });
});

// get all public plans from db
export const getAllPublicPlans = functions.https.onCall(() => {
  return admin
    .firestore()
    .collection('plans')
    .where('isPrivate', '==', false)
    .where('startTime', '>=', new Date())
    .orderBy('startTime', 'desc')
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
});

// get all plans for a user
export const getAllPlansForUser = functions.https.onCall((data) => {
  return admin
    .firestore()
    .collection('plans')
    .where('attendees', 'array-contains', data.userId)
    .orderBy('startTime', 'desc')
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
});

// delete a plan from DB
export const deletePlan = functions.https.onCall((data) => {
  admin.firestore().collection('plans').doc(data.planId).delete();
});
