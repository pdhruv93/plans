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

export const scheduledFunction = functions.pubsub.schedule('every 24 hours').onRun(() => {
  const date = new Date();
  const today = new Date();
  const nextDay = date.setDate(date.getDate() + 1);

  admin
    .firestore()
    .collection('plans')
    .where('startTime', '>=', today)
    .where('startTime', '<', nextDay)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach((doc) => {
        const plan = doc.data();
        const deviceIds: string[] = [];

        functions.logger.info(`:::::::::::::::Plan ${JSON.stringify(plan)}`);
        admin
          .firestore()
          .collection('users')
          .where('userId', 'in', plan.attendees)
          .get()
          .then((snapshot) =>
            snapshot.docs.forEach((doc) => {
              const user = doc.data();
              deviceIds.push(user.deviceId);
            }),
          );

        const message = {
          data: {
            title: 'You have an upcoming plan',
            body: `${plan.title} starting at ${plan.startTime}`,
          },
          tokens: deviceIds,
        };

        functions.logger.info(`:::::::::::::::Sending push notifications to ${deviceIds}`);
        admin.messaging().sendMulticast(message);
      }),
    );
});
